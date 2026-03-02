import Cart from "../models/Cart.js"
import Product from "../models/Products.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// Add to cart (vendor/admin)
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // @validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: '❌ Invalid product Id' })
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

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock',
            });
        }

        // @Get the cart
        let cart = await Cart.findOne({ user: req.userId });

        // @check if cart exists else create
        if (!cart) {
            cart = new Cart({ user: req.userId, items: [] });
        }

        // 

        // @Check if product is in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        // @if not increase quantity
        if (itemIndex > -1) {
            // Product already in cart → increase quantity
            cart.items[itemIndex].quantity += quantity;
            // cart.items[itemIndex].subTotal = cart.items[itemIndex].price * quantity;
        } else {
            // Add new product
            cart.items.push({
                product: product._id,
                name: product.title,
                price: product.price,
                finalPrice: product.finalPrice,
                discountAmount: product.discountAmount,
                image: product.image,
                quantity,
                // subTotal,
            });
        }

        // Recalculate total
        // cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
         // Recalculate totals
        cart.calculateTotals();
        
        await cart.save();
        console.log(cart)
        return res.status(200).json(cart);

    } catch (error) {
        console.log(error)
       	return res.json(error);
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

export const getCart = async (req, res) => {
  try {
    	const cart = await Cart.find()
        return res.status(200).json({ message: "Product fetch successfull🥇", cart })
    } catch (error) {
    	return res.status(401).json(error)
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
        // const cart = await Cart.findOne({ user: req.userId });
        await Cart.deleteMany({})
        return res.status(200).json({ message: "Product fetch successfull🥇" })
    } catch (error) {
        return res.status(401).json(error)
    }
}