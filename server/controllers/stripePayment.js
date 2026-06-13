import Order from "../models/Order.js"
import Products from "../models/Products.js"
import slugify from 'slugify'
import mongoose from 'mongoose'
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
	try {
		const { orderId } = req.body; // stripePaymentIntentId

		// @validate ObjectId format
	    if (!mongoose.Types.ObjectId.isValid(orderId)) {
	        return res.status(400).json({ msg: '❌ Invalid orderId' })
	    }
	    // @Get the order
	    const order = await Order.findById(orderId);
	    // @Check if order exists
	    if (!order) return res.status(404).json({ message: "Order not found" });

	    // @Create payment intent
	    const paymentIntent = await stripe.paymentIntents.create({
		    amount:   Math.round(order.totalAmount * 100),
		    currency: "kes",
		    metadata: { orderId: orderId.toString() },
		    automatic_payment_methods: { enabled: true },
	    });

	    console.log("id:",            paymentIntent.id);
		console.log("client_secret:", paymentIntent.client_secret);

	    // Save intent ID on order
	    await Order.findByIdAndUpdate(orderId, {
	      	"paymentDetails.stripePaymentIntentId": paymentIntent.id,
	    });

	    res.json({
	      	clientSecret: paymentIntent.client_secret,
	    });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}


export const stripeWebhook = async (req, res) => {
	const sig = req.headers["stripe-signature"];
  	let event;

  	try {
    	// req.body must be raw Buffer here — see route setup below
	    event = stripe.webhooks.constructEvent(
	      	req.body,
	      	sig,
	      	process.env.STRIPE_WEBHOOK_SECRET
	    );
  	} catch (err) {
    	return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  	}

  	try {
	    switch (event.type) {
		    case "payment_intent.succeeded": {
		        const intent  = event.data.object;
		        const orderId = intent.metadata.orderId;

		        await Order.findByIdAndUpdate(orderId, {
			        paymentStatus: "Completed",
			        orderStatus:   "Processing",
			        "paymentDetails.stripeChargeId": intent.latest_charge,
			        "paymentDetails.amount":         intent.amount_received / 100,
			        paidAt: new Date(),
		        });
	        	break;
	      	}
	      	case "payment_intent.payment_failed": {
		        const intent  = event.data.object;
		        const orderId = intent.metadata.orderId;

		        const order = await Order.findByIdAndUpdate(orderId, {
		          	paymentStatus: "Failed",
		          	"paymentDetails.failureReason": intent.last_payment_error?.message,
		        }, { new: true });

		        // Restore stock
		        for (const item of order.items) {
			        await Products.findByIdAndUpdate(item.product, {
			            $inc: { stock: item.quantity },
			        });
		        }
		        break;
	      	}
	    }
	    res.json({ received: true });
    } catch (error) {
    	console.error("Stripe webhook error:", error);
    	res.status(500).json({ message: error.message });
    }
}

// https://docs.stripe.com/development/dashboard/webhooks#create-webhook-endpoint

// https://docs.stripe.com/development/dashboard/webhooks#create-webhook-endpoint