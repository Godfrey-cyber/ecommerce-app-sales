import Cart from "../models/Cart.js"
import Product from "../models/Products.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// Add to cart (vendor/admin)
export const addToCart = async (req, res) => {
    // @Validate basic data input
    let { productId, quantity } = req.body;
    quantity = parseInt(quantity, 10)

    if (!productId || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ 
            success: false, 
            message: '❌ Valid Product ID and positive quantity are required.' 
        });
    }

    try {
        // @validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: '❌ Invalid product Id' })
        }


        // 3. Optimized Product Fetch (Only select required fields to save memory)
        const product = await Product.findById(productId).select('stock title price finalPrice discountAmount image');
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // 4. Get or initialize the cart
        let cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            cart = new Cart({ user: req.userId, items: [] });
        }

        // 5. Check if product is already in the cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        // 6. Fix Cumulative Stock Bypass Bug
        const currentCartQuantity = itemIndex > -1 ? cart.items[itemIndex].quantity : 0;
        const totalRequestedQuantity = currentCartQuantity + quantity;

        if (product.stock < totalRequestedQuantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. You already have ${currentCartQuantity} in cart, and max available is ${product.stock}.`,
            });
        }

        console.log("product", product)

        // 7. Update or Push items
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = totalRequestedQuantity;
        } else {
            cart.items.push({
                product: product._id,
                name: product.title,
                price: product.price,
                finalPrice: product.finalPrice,
                discountAmount: product.discountAmount || 0,
                image: product.image,
                quantity,
            });
        }

        if (typeof cart.calculateTotals === 'function') {
            cart.calculateTotals();
        } else {
            // Fallback manual calculation if your schema method isn't set up yet:
            cart.discount = cart.items.reduce((sum, item) => sum + (item.discountAmount * item.quantity), 0);
        }

        // 8. Recalculate totals and Save
        cart.calculateTotals();
        await cart.save();

        console.log("cart", cart)

        return res.status(200).json({ 
            success: true,
            message: "Successfully added items to cart", 
            cart: cart 
        });
    } catch (error) {
        // Log the actual error for developers, don't expose system details to client
        console.error("Error in addToCart controller:", error); 
        
        return res.status(500).json({ 
            success: false, 
            message: "An internal server error occurred while updating the cart. Try again" 
        });
    }
}

export const updateCartItem = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        let { quantity } = req.body;
        const { itemId } = req.params;

        // 1. Strict input validation
        quantity = parseInt(quantity, 10);
        if (isNaN(quantity) || quantity < 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: '❌ Quantity must be a non-negative integer.',
            });
        }

        // 2. FIXED: Added .session(session) to the Cart query
        const cart = await Cart.findOne({ user: req.userId }).session(session);
        
        if (!cart) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        // 3. Extract the item subdocument
        const cartItem = cart.items.id(itemId);
        if (!cartItem) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }

        // 4. Fetch product attached to the transaction session
        const product = await Product.findById(cartItem.product).session(session);
        if (!product) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        const currentQuantity = cartItem.quantity || 0;
        const quantityDiff = quantity - currentQuantity;

        // 5. Short-circuit: If quantity hasn't changed, save DB operations
        if (quantityDiff === 0) {
            await session.commitTransaction();
            await cart.populate('items.product', 'title price image stock');
            return res.status(200).json({ success: true, message: 'No changes made', cart });
        }

        // 6. Handle Item Removal (Quantity is 0)
        if (quantity === 0) {
            product.stock += currentQuantity;
            await product.save({ session });

            cart.items.pull(itemId);
            cart.calculateTotals();
            await cart.save({ session });
          
            await session.commitTransaction();
            
            // Populate AFTER transaction commits to minimize transaction holding time
            await cart.populate('items.product', 'title price image stock');
          
            return res.json({
                success: true,
                message: 'Item removed from cart',
                cart,
            });
        }

        // 7. Check stock availability (Only if increasing quantity)
        if (quantityDiff > 0 && product.stock < quantityDiff) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: `Can't add item! Only ${product.stock} additional units available.`,
            });
        }
        
        // 8. Update Cart schema state
        await cart.updateItemQuantity(itemId, quantity);
        await cart.save({ session });

        // 9. Update Product stock state
        product.stock -= quantityDiff;
        await product.save({ session });

        // 10. Commit changes atomically
        await session.commitTransaction();
        
        // 11. FIXED: Final populate & clear response return
        await cart.populate('items.product', 'title price image stock');
        
        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart,
        });

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        next(error);
    } finally {
        session.endSession();
    }
};

export const removeCartItem = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
        const { itemId } = req.params;

        // 1. Fetch the complete cart bound to the transaction
        const cart = await Cart.findOne({ user: req.userId }).session(session);
        if (!cart) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // 2. Identify the target item within the fetched array
        const cartItem = cart.items.id(itemId);
        if (!cartItem) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // 3. Return stock to the product document
        const product = await Product.findById(cartItem.product).session(session);
        if (product) {
            product.stock += cartItem.quantity;
            await product.save({ session });
        }

        // 4. Safely pull item from array and recalculate totals in-memory
        cart.items.pull(itemId);
        cart.calculateTotals();

        // 5. Single, clean database write for the cart modification
        await cart.save({ session });

        // 6. Finalize transaction changes
        await session.commitTransaction();
        
        return res.status(200).json({ 
            success: true, 
            message: 'Item successfully removed', 
            cart 
        });

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        next(error);
    } finally {
        session.endSession();
    }
};

export const getCart = async (req, res) => {
    try {
        // 1. FIXED: Use findOne instead of find, and add .lean() for blazing-fast reads
        const cart = await Cart.findOne({ user: req.userId }).lean();
        
        // 2. This check now works flawlessly because findOne returns null if not found
        if (!cart) {
            return res.status(404).json({ 
                success: false,
                message: 'Cart not found' 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Cart fetched successfully", 
            cart 
        });

    } catch (error) {
        // Log locally for debugging
        console.error(`Error in getCart for user ${req.userId}:`, error);
        
        return res.status(500).json({ 
            success: false, 
            message: "An internal server error occurred while retrieving your cart." 
        });
    }
};
// default: "active" products
export const getOne = async (req, res) => {
    try {
        const product = await Products.findOne({ status: "active" })
        // Handle case where no active product is found
        if (!product) {
            return res.status(404).json({ message: "No active product found 🔍" });
        }
        return res.status(200).json({ message: "Product fetch successfull🥇", product })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteCart = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Find the user's specific cart within the transaction context
        const cart = await Cart.findOne({ user: req.userId }).session(session);
        
        if (!cart) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // 2. Loop through cart items and return stock to each product
        if (cart.items && cart.items.length > 0) {
            for (const item of cart.items) {
                await Product.updateOne(
                    { _id: item.product },
                    { $inc: { stock: item.quantity } },
                    { session }
                );
            }
        }

        // 3. FIXED: Safely delete ONLY this user's cart document
        await Cart.deleteOne({ user: req.userId }).session(session);

        await session.commitTransaction();

        return res.status(200).json({ 
            success: true, 
            message: "Cart emptied and deleted successfully" 
        });

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        // Pass error to global handler instead of leaking raw details with a 401
        next(error); 
    } finally {
        session.endSession();
    }
};