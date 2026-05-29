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

        // @Get the product
        const product = await Product.findById(productId);
        // console.log(product)
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

        // 7. Update or Push items
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = totalRequestedQuantity;
        } else {
            cart.items.push({
                product: product._id,
                name: product.title,
                price: product.price,
                finalPrice: product.finalPrice,
                discountAmount: product.discountAmount,
                image: product.image,
                quantity: quantity,
            });
        }

        // 8. Recalculate totals and Save
        cart.calculateTotals();
        await cart.save();

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
        const { quantity } = req.body;
        const { itemId } = req.params;

        // if (!quantity || quantity < 0) {
        //   return res.status(400).json({
        //     success: false,
        //     message: 'Invalid quantity',
        //   });
        // }
        
        const cart = await Cart.findOne({ user: req.userId });
        
        if (!cart) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        // ✅ STEP 1: Get the cart item using cart item ID
        const cartItem = cart.items.id(itemId);
        
        if (!cartItem) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }

        // Check stock
        const product = await Product.findById(cartItem.product).session(session);

        if (!product) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Calculate stock difference
        const currentQuantity = cartItem.quantity || 0;
        const quantityDiff = quantity - currentQuantity;

        if (quantity === 0) {
            // Return stock to product (give back all items)
            await Product.findByIdAndUpdate(
                product._id,
                { $inc: { stock: currentQuantity } },  // Add back current quantity
                { session }
            );

            // Remove item from cart
            cart.items.pull(itemId);

            // Recalculate totals
            cart.calculateTotals();

            // Save cart
            await cart.save({ session });
          
            // Commit transaction
            await session.commitTransaction();
          
            // Populate and return
            await cart.populate('items.product', 'title price image stock');
          
            return res.json({
                success: true,
                message: 'Item removed from cart',
                cart,
            });
        }

        // Check stock (only if increasing quantity)
        if (quantityDiff > 0 && product.stock < quantityDiff) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: `Can't add item! Only ${product.stock} items available in stock`,
            });
        }
        
        // Update quantity
        await cart.updateItemQuantity(itemId, quantity);
        await cart.save({ session });

        // ✅ ATOMIC: Update product stock
        if (quantityDiff !== 0) {
            await Product.findByIdAndUpdate(
                product._id,
                { $inc: { stock: -quantityDiff } },
                { session }
            );
        }

        await session.commitTransaction()
        
        // Populate and return
        await cart.populate('items.product', 'title price images stock');
        
        res.json({
            success: true,
            message: 'Cart updated',
            cart,
        });
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
};

export const removeCartItem = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.userId, "items._id": itemId }, { "items.$": 1 }).session(session);

        if (!cart) throw new Error("Item not found");

        // const cartItem = cart.items.id(itemId);
        const cartItem = cart.items[0];
        
        // Return stock to product
        await Product.updateOne(
            { _id: cartItem.product },
            { $inc: { stock: cartItem.quantity } },
            { session }
        );
        
        // Remove item Atomically
        const updatedCart = await Cart.findOneAndUpdate(
            { user: req.userId },
            { $pull: { items: { _id: itemId } } },
            { new: true, session }
        );

        // cart.items.pull(itemId);
        // Recalculate totals
        await updatedCart.calculateTotals();
        await updatedCart.save({ session });

        await session.commitTransaction();
        
        res.json({ success: true, message: 'Item successfull🥇 removed', cart: updatedCart });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

export const getCart = async (req, res) => {
    console.log("-userId-", req.userId)
    try {
    	const cart = await Cart.find({ user: req.userId })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        return res.status(200).json({ message: "Cart fetched successfull🥇", cart, success: true })
    } catch (error) {
    	return res.status(500).json({ message: error.message, success: false })
    }
}
// default: "active"
	// Cart.findOne({ status: "active" })
export const getOne = async (req, res) => {
    try {
        const product = await Products.findOne({ status: "active" })
        return res.status(200).json({ message: "Product fetch successfull🥇", product })
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId });
        await Cart.deleteMany({})
        return res.status(200).json({ message: "Product fetch successfull🥇" })
    } catch (error) {
        return res.status(401).json(error)
    }
}