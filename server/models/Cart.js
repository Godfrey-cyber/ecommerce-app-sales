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
    let itemSubtotalAccumulator = 0;
    let totalItemDiscountAccumulator = 0;
    let totalItemsCount = 0;

    this.items.forEach((item) => {
        // 1. Fill individual item records if missing
        const originalPrice = item.price || 0;
        const individualDiscount = item.discountAmount || 0;
        
        item.finalPrice = Math.max(0, originalPrice - individualDiscount);
        
        // 2. Individual line subtotal: (original price * qty)
        item.subtotal = originalPrice * item.quantity;

        // 3. Increment main counters
        itemSubtotalAccumulator += item.subtotal;
        totalItemDiscountAccumulator += individualDiscount * item.quantity;
        totalItemsCount += item.quantity;
    });

    // 4. Map values back to parent document
    this.totalItems = totalItemsCount;
    this.totalAmount = itemSubtotalAccumulator; // Gross subtotal total
    this.discount = totalItemDiscountAccumulator; // Cumulative items discount

    // 5. Check if an order-level coupon is applied
    let couponSavings = 0;
    if (this.coupon && this.coupon.discount > 0) {
        const netValueBeforeCoupon = Math.max(0, this.totalAmount - this.discount);
        
        if (this.coupon.couponType === 'percentage') {
          couponSavings = netValueBeforeCoupon * (this.coupon.discount / 100);
        } else if (this.coupon.couponType === 'fixed') {
          couponSavings = this.coupon.discount;
        }
        
        // Stack the coupon value onto the total savings tracker
        this.discount += couponSavings;
    }

    // 6. Formulate total calculation matrix
    const baseTax = this.tax || 0;
    const baseShipping = this.shipping || 0;

    // Final price to charge: Gross - Discounts + Tax + Shipping
    this.finalAmount = Math.max(0, (this.totalAmount - this.discount) + baseTax + baseShipping);

    return this;
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