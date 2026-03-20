import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
});

const shippingAddressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    county: {
        type: String,
        required: true,
    },
    subCounty: {
        type: String,
        required: true,
    },
    station: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
});

const orderSchema = new mongoose.Schema(
    {
        // User who placed the order
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        
        // Order items (products with quantities)
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function(items) {
                    return items && items.length > 0;
                },
                message: 'Order must have at least one item',
            },
        },
        
        // Shipping/Delivery information
        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },
        
        // ✅ Delivery method (from checkout page)
        deliveryMethod: {
            type: String,
            enum: ['Door Delivery', 'Pickup Station'],
            required: true,
        },
        
        // ✅ Payment method (from checkout page)
        paymentMethod: {
            type: String,
            enum: ['M-Pesa', 'Bank', 'Pay-On-Delivery'],
            required: true,
        },
        
        // Payment status
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
            default: 'Pending',
            index: true,
        },
        
        // ✅ Pricing breakdown (from cart)
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
        
        deliveryFee: {
            type: Number,
            default: 0,
            min: 0,
        },
        
        tax: {
            type: Number,
            default: 0,
            min: 0,
        },
        
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        
        // Order status tracking
        orderStatus: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'pending',
            index: true,
        },
        
        // Timestamps for order lifecycle
        confirmedAt: {
            type: Date,
        },
        
        shippedAt: {
            type: Date,
        },
        
        deliveredAt: {
            type: Date,
        },
        
        cancelledAt: {
            type: Date,
        },
        
        // Tracking information
        trackingNumber: {
            type: String,
        },
        
        // Notes
        orderNotes: {
            type: String,
        },
        
        customerNotes: {
            type: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 }); // Get user's orders sorted by date
orderSchema.index({ orderStatus: 1, createdAt: -1 }); // Filter by status
orderSchema.index({ paymentStatus: 1 }); // Filter by payment status

const Order = mongoose.model('Order', orderSchema);

export default Order;