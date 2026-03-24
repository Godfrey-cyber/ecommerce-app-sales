import Cart from "../models/Cart.js"
import Products from "../models/Products.js"
import Order from "../models/Order.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @Create an order
export const createOrder = async (req, res) => {
	const session = await mongoose.startSession();
  	session.startTransaction();
  	const { accessToken } = req.cookies
  	console.log(accessToken)
  	console.log(req.userId)
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

	    console.log("Req.body ====", req.body)

    	if (!items || items.length === 0) {
    		await session.abortTransaction();
    		return res.status(400).json({ 
    			success: false, 
    			message: "No items in order" 
    		});
    	}

    	if (!shippingAddress || !deliveryMethod || !paymentMethod) {
	    	await session.abortTransaction();
	    	return res.status(400).json({ 
	    		success: false, 
	    		message: "Missing shipping or payment information" 
	    	});
	    }

	    // get all products
	    const productIds = items.map(item => {
	    	if (typeof item.product === 'string') {
	    		return new mongoose.Types.ObjectId(item.product);
	    	}
	    	return item.product;
	    })

	    // const productIds = items.map(item => item.product.toString())

	    // console.log("items ======== ", items)
	    // console.log("productIds ======== ", productIds)
	    const products = await Products.find({ _id: { $in: productIds } })

	    if (products.length === 0) {
	    	await session.abortTransaction();
	    	return res.status(404).json({ 
	    		success: false, 
	    		message: "No products found in database" 
	    	});
	    }
	    console.log("products", products)
	    //validate products
	    const validatedProducts = [];

	    for (const item of items) {
	    	const itemProductId = item.product.toString();
		    const dbProduct = products.find(p => p._id.toString() === itemProductId);
		    
		    if (!dbProduct) {
		        await session.abortTransaction();
		        return res.status(404).json({ msg: `Product ${item?.title || item?.product} not found`  });
		    }
		    
		    if (dbProduct.stock < item.quantity) {
		        await session.abortTransaction();
		        return res.status(400).json({ message: `${dbProduct.name} is out of stock. Only ${dbProduct.stock} available.` });
		    }
		    
		    validatedProducts.push(dbProduct); // ✅ Only adds valid products
		}

	    // Calculate Delivery
	    const deliveryFees = { 
		    'Door Delivery': 1040,
		    'Pickup Station': 540
		};

		const shippingPrice = deliveryFees[deliveryMethod];

	    if (!shippingPrice) {
	    	return res.status(401).json({ success: false, message: "Invalid delivery method" })
	    }
	    const totalPrice = totalAmount + shippingPrice

	    // Create Order.
	    const order = await Order.create([{
	    	user: req.userId,
	    	items: items.map(item => ({ // ✅ Added this
		        product: item.product,
		        title: item.title,
		        quantity: item.quantity,
		        price: item.price,
		        totalPrice,
		    })),
	    	shippingAddress,
		    deliveryMethod,
		    paymentMethod,
		    subtotal,
		    deliveryFee: shippingPrice,    // ✅ Saved here
		    tax,
		    discount,
		    totalAmount: totalPrice,
		    orderStatus: 'Pending',
      		paymentStatus: 'Pending',
	    }], { session })

	    // Atomic Stock Reduction
	    for (const item of items) {
	      	const itemProductId = typeof item.product === 'string' 
	    		? new mongoose.Types.ObjectId(item.product)
	    		: item.product;
 
	      	const updated = await Products.findOneAndUpdate(
		        { 
		        	_id: itemProductId, 
		        	stock: { $gte: item.quantity } 
		        },
		        { $inc: { stock: -item.quantity } },
		        { session, new: true }
	      	);
 
	      	if (!updated) {
	      		await session.abortTransaction();
	      		return res.status(400).json({ 
	      			success: false, 
	      			message: `Failed to update stock for ${item.title}. It may have been purchased by someone else.` 
	      		});
	      	}
	    }

	    await Cart.findOneAndUpdate(
	      	{ user: req.userId },
	      	{ items: [], subtotal: 0, totalItems: 0, tax: 0, discount: 0, finalAmount: 0  },
	      	{ session }
	    );

	    await session.commitTransaction()

	    const populatedOrder = await Order.findById(order[0]._id)
	    	.populate('user', 'firstname lastname email')
	    	.populate('items.product', 'name price images');

	    return res.status(201).json({ success: true, order: order[0], message: "Order Successfully created." })

  	} catch (error) {
  		await session.abortTransaction();
  		console.log(error)
  		return res.status(500).json({ success: false, message: error.message })
  	} finally {
	    session.endSession();
	}
}

export const getOrders = async (req, res) => {
	try {
		let query = {}
		console.log("-admin-", req.user.role)

		if (req.user.role === "admin") {
			query = {}
		}

		else if (req.user.role === "customer" || req.user.role === "vendor") {
			query = { user: req.userId }
		}

		else {
			return res.status(403).json({
				status: "fail",
				message: "Not Authorized"
			})
		}
		console.log("query", query)
		console.log("role", req.user.role)
		console.log("role", req.user)
		const orders = await Order.find(query)
	    	.populate('user', 'firstname lastname email')
	    if (!orders) {
            return res.status(404).json({ message: 'No order not found!' })
        }

	    return res.status(200).json({ success: true, orders, message: "Order Fetched Successfully." })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}