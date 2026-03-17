import Cart from "../models/Cart.js"
import Product from "../models/Products.js"
import Order from "../models/Order.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @Create an order
export const createOrder = async (req, res, next) => {
	const session = await mongoose.startSession();
  	session.startTransaction();

  	try {
  		const {
		    items,
		    shippingAddress,
		    deliveryMethod,
		    paymentMethod,
		    subtotal,
		    deliveryFee,
		    tax,
		    discount,
		    totalAmount,
	    } = req.body;

	    // get all products
	    const productIds = items.map(item => item.product)
	    const products = await Products.find({ _id: { $in: productIds } }).session(session)

	    //validate products
	    const validatedProducts = items.map(item => {
	     	const dbProduct = products.find(p => p._id.toString() === item.product)

	     	if (!dbProduct) {
		    	return res.status(401).json({ success: false, message: "No Product found" })
		    }

		    if (dbProduct.stock < item.quantity) {
		    	return res.status(401).json({ success: false, message: `${dbProduct.name} is out of stock.`})
		    }

		    return dbProduct
	    })

	    // Calculate Delivery
	    const delivery = { door: 1040, station: 540 }
	    const shippingPrice = delivery[deliveryMethod]
	    if (!shippingPrice) {
	    	return res.status(401).json({ success: false, message: "Invalid delivery method" })
	    }
	    const totalPrice = totalAmount + shippingPrice

	    // Create Order.
	    const order = await Order.create([{
	    	user: req.userId,
	    	shippingAddress,
		    deliveryMethod,
		    paymentMethod,
		    subtotal,
		    deliveryFee: shippingPrice,    // ✅ Saved here
		    tax,
		    discount,
		    totalAmount: totalPrice,
		    orderStatus: 'pending',
      		paymentStatus: 'pending',
	    }], { session })

	    // Atomic Stock Reduction
	    for (const item of validatedProducts) {
	      	const updated = await Product.findByIdAndUpdate(
		        {_id: item.product, stock: item.quantity },
		        { $inc: { stock: -item.quantity } },
		        { session }
	      	);

	      	if (!updated) {
	      		return res.status(500).json({ success: false, message: "Something went wrong." })
	      	}
	    }

	    await Cart.findOneAndUpdate(
	      	{ user: req.userId },
	      	{ items: [], subtotal: 0, totalItems: 0 },
	      	{ session }
	    );

	    await session.commitTransaction()

	    return res.status(201).json({ success: true, order: order[0], message: "Order Successfully created." })

  	} catch (error) {
  		await session.abortTransaction();
  		return res.status(500).json({ success: false, message: error.message })
  	} finally {
	    session.endSession();
	}
}