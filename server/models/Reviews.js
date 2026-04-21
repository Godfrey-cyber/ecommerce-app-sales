import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "A Review must belong to a User."],
		ref: "user",
		index: true,
	},
	product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "A Review must belong to a Product."],
      index: true,
    },
	rating: {
      type: Number,
      required: [true, "A Review must have a rating."],
      min: 1,
      max: 5,
    },
    comment: {
        type: String,
        required: [true, "A Review must have a comment."],
        trim: true,
        minlength: [10, 'Review must be at least 10 characters'],
        maxlength: [1000, 'Review must be under 1000 characters'],
    },
	isVerifiedPurchase: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: true, // set false if you want moderation
    },
}, { timestamps: true }, {  autoIndex: process.env.NODE_ENV !== "production", })

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
ReviewSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

ReviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

    if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].numReviews,
    });
  } else {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
  }
};
 
ReviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});
 
ReviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) doc.constructor.calcAverageRatings(doc.product);
});
 
export default mongoose.model('Review', ReviewSchema);