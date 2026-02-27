import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      // required: true,
    },

    image: {
      type: String,
    },

    price: {
      type: Number,
      // required: true,
    },

    discountAmount: {
      type: Number,
    },

    finalPrice: {
      type: Number,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must  be atleast 1"],
      default: 1,
    },

    variant: {
      size: { type: String },
      color: { type: String },
    },

    subtotal: {
      type: Number,
      // required: true,
    },
  },
  // { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional for guest cart
      index: true,
    },

    guestId: {
      type: String,
      index: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    discount: {
    type: Number,
    default: 0,
    },
    
    tax: {
      type: Number,
      default: 8,
    },
    
    shipping: {
      type: Number,
      default: 0,
    },

    coupon: {
      code: String,
      discount: Number,
      type: {
        String,
        enum: ['percentage', 'fixed'],
      },
    },

    finalAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "converted", "abandoned"],
      default: "active",
    },

    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// TTL index for guest cart auto cleanup
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

CartSchema.index({ user: 1 });
CartSchema.index({ 'items.product': 1 });

CartSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

// Calculate cart totals
CartSchema.methods.calculateTotals = function() {
  // Calculate subtotal
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate totalItems
  this.totalItems = this.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

    // Total discount from items
    const totalItemDiscount = this.items.reduce(
        (total, item) =>
            total + ((item.discountAmount || 0) * item.quantity),
        0
    );

  // Total before discount
  const grossTotal = this.items.reduce(
      (total, item) =>
          total + (item.price * item.quantity),
      0
  );

  // Total after item discount
  const discountedSubtotal = this.items.reduce(
      (total, item) =>
          total + (item.finalPrice * item.quantity),
      0
  );
  console.log(discountedSubtotal)

  this.totalAmount = grossTotal;
  this.discount = totalItemDiscount;  
  // this.totalAmount = subtotal;
  
  // Calculate discount from coupon
  let couponDiscount = 0;
  if (this.coupon) {
    if (this.coupon.type === 'percentage') {
        couponDiscount = (discountedSubtotal * this.coupon.discount) / 100;
    } else {
      couponDiscount = this.coupon.discount;
    }
  } else {
    this.discount = 0;
  }

  this.discount += couponDiscount;

  const taxableAmount = discountedSubtotal - couponDiscount;
  
  // Calculate tax (8% example - adjust based on your needs)
  const taxRate = 0.08;
  this.tax = taxableAmount * taxRate;
  
  // Calculate shipping (free shipping if totalAmount > $50, else $10)
  this.shipping = taxableAmount > 100 ? 0 : 50;
  
  // Calculate finalAmount
  this.finalAmount = taxableAmount + this.tax + this.shipping;
  
  // Round to 2 decimal places
  this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  this.discount = Math.round(this.discount * 100) / 100;
  this.tax = Math.round(this.tax * 100) / 100;
  this.finalAmount = Math.round(this.finalAmount * 100) / 100;
};

// Add item to cart
CartSchema.methods.addItem = async function(productData) {
  const { product, quantity = 1, variantId = null } = productData;
  
  // Check if item already exists
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === product.toString() && 
    item.variantId === variantId
  );
  
  if (existingItemIndex > -1) {
    // Update quantity
    this.items[existingItemIndex].quantity += quantity;
  } else {
    // Get product details
    const Product = mongoose.model('Product');
    const product = await Product.findById(product);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Add new item
    this.items.push({
        product: product,
        // productId: productId,
        name: product.title,
        price: product.price,
        image: product.image || '',
        quantity: product.quantity,
        variantId,
    });
  }
  this.calculateTotals();
  await this.save();
  return this;
};

// Update item quantity
CartSchema.methods.updateItemQuantity = function(itemId, quantity) {
  const item = this.items.id(itemId);
  
  if (!item) {
    throw new Error('Item not found in cart');
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0
    this.items.pull(itemId);
  } else {
    item.quantity = quantity;
  }
  
  this.calculateTotals();
  return this.save();
};

// Apply coupon
CartSchema.methods.applyCoupon = function(couponData) {
  this.coupon = couponData;
  this.calculateTotals();
  return this.save();
};

// Remove coupon
CartSchema.methods.removeCoupon = function() {
  this.coupon = null;
  this.calculateTotals();
  return this.save();
};

// Get item count
// CartSchema.virtual('itemCount').get(function() {
//   return this.items.reduce((count, item) => count + item.quantity, 0);
// });

// Get discount count
// CartSchema.virtual('totalDiscount').get(function() {
//   return this.items.reduce((discount, item) => count + item.discount, 0);
// });

CartSchema.set('toJSON', { virtuals: true });
CartSchema.set('toObject', { virtuals: true });

export default mongoose.model('Cart', CartSchema);