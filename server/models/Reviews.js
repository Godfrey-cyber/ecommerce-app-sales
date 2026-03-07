import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user"
		index: true,
	},
	product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
	rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
	createdAt: {
		type: Date,
		required: true,
	},
	isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true, // set false if you want moderation
    },
	expiresAt: {
		type: Date,
		required: true,
	}
}, { timestamps: true }, {  autoIndex: process.env.NODE_ENV !== "production", })

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
ReviewSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

ReviewSchema.statics.updateProductRating = async function (productId) {
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

  await mongoose.model("Product").findByIdAndUpdate(productId, {
    averageRating: stats[0]?.avgRating || 0,
    reviewCount: stats[0]?.reviewCount || 0,
  });
};

ReviewSchema.post("save", async function () {
  await this.constructor.updateProductRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.updateProductRating(this.product);
});

export default mongoose.model('Review', ReviewSchema);