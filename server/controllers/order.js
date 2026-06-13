import Cart from "../models/Cart.js"
import Products from "../models/Products.js"
import Order from "../models/Order.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
	const session = await mongoose.startSession();
  	session.startTransaction();
  	const { accessToken } = req.cookies
  	try {
  		const {
		    items,
		    shippingAddress,
		    deliveryMethod,
		    paymentDetails,
		    paymentMethod,
		    subtotal,
		    deliveryFee,
		    tax,
		    discount,
		    totalAmount,
	    } = req.body;

	    // 1. Structural Validations
        if (!items || items.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({ success: false, message: "No items in order" });
        }

        if (!shippingAddress || !deliveryMethod || !paymentMethod) {
            await session.abortTransaction();
            return res.status(400).json({ success: false, message: "Missing shipping or payment information" });
        }

        // 2. Map and Sanitize Product IDs
        const productIds = items.map(item => 
            typeof item.product === 'string' ? new mongoose.Types.ObjectId(item.product) : item.product
        );

        // Fetch products matching the items in cart
        const products = await Products.find({ _id: { $in: productIds } }).session(session);

        if (products.length !== items.length) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: "One or more products not found in database" });
        }

	    // 3. Inventory & Stock Validation Loop
        for (const item of items) {
            const itemProductId = item.product.toString();
            const dbProduct = products.find(p => p._id.toString() === itemProductId);
            
            if (dbProduct.stock < item.quantity) {
                await session.abortTransaction();
                return res.status(400).json({ 
                    success: false, 
                    message: `${dbProduct.name} is out of stock. Only ${dbProduct.stock} available.` 
                });
            }
        }

	    // 4. Delivery Pricing Calculations
        const deliveryFees = { 
            'Door Delivery': 1040,
            'Pickup Station': 540
        };

        const shippingPrice = deliveryFees[deliveryMethod];
        if (shippingPrice === undefined) {
            await session.abortTransaction(); // Fixed missing abort here!
            return res.status(400).json({ success: false, message: "Invalid delivery method" });
        }
        
        const totalPrice = totalAmount + shippingPrice;



	    // 5. Instantiate and Save Order
        // Using instanced documents makes managing single transaction updates cleaner
        const newOrder = new Order({
            user: req.userId, // Populated from your auth middleware
            items: items.map(item => ({
                product: item.product,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.price * item.quantity,
            })),
            shippingAddress,
            paymentDetails,
            deliveryMethod,
            paymentMethod,
            subtotal,
            deliveryFee: shippingPrice, 
            tax,
            discount,
            totalAmount: totalPrice,
            orderStatus: 'Pending',
            paymentStatus: 'Pending',
        });

        await newOrder.save({ session });

	    // 6. Atomic Stock Reduction Loop
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

	    // 7. Clear User's Active Shopping Cart
        await Cart.findOneAndUpdate(
            { user: req.userId },
            { items: [], subtotal: 0, totalItems: 0, tax: 0, discount: 0, finalAmount: 0 },
            { session }
        );

        // Commit all changes successfully
        await session.commitTransaction();

        // 8. Populate Data for Client Response
        const populatedOrder = await Order.findById(newOrder._id)
            .populate('user', 'firstname lastname email')
            .populate('items.product', 'name price images');

        return res.status(201).json({ 
            success: true, 
            message: "Order successfully created.", 
            order: populatedOrder 
        });
  	} catch (error) {
  		// Abort transaction safely if any unhandled error spikes
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error("Order Creation Error 🚨:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  	} finally {
  		// Freeing the connection session
	    session.endSession();
	}
}

// @desc    Get orders based on user role
// @route   GET /api/orders
// @access  Private (Admin, Vendor, Customer)
export const getOrders = async (req, res) => {
	try {
		let query = {}

		// @Admins see things globally
		if (req.user.role === "admin") {
			query = {}
		}
		// Customers only see orders they placed themselves
		else if (req.user.role === "customer") {
			query = { user: req.userId }
		}

		else if (req.user.role === "vendor") {
		// Vendors only see orders containing products they own
			query = { "items.product": { $in: await getVendorProductIds(req.userId) } };
		} else {
			return res.status(403).json({
                success: false,
                message: "Not Authorized: Invalid role permissions"
            });
		}

		// 2. Fetch and populate orders
        const orders = await Order.find(query)
            .populate('user', 'firstname lastname email')
            .populate('items.product', 'name price images vendor') // Added product population
            .sort({ createdAt: -1 }); // Recommended: Show newest orders first

        // 3. Check if any orders exist (Fixing the empty array bug)
        if (orders.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "No orders found matching your account criteria." 
            });
        }

        return res.status(200).json({ 
            success: true, 
            count: orders.length, 
            orders, 
            message: "Orders fetched successfully." 
        });
	} catch (error) {
		console.error("Error fetching orders 🚨:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Internal Server Error" 
        });
	}
}

// Helper utility function if your Order schema doesn't explicitly store 'vendor' at the root item level
async function getVendorProductIds(vendorId) {
    const products = await Products.find({ vendor: vendorId }).select('_id');
    return products.map(p => p._id);
}