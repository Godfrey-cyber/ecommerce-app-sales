import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user"
	},
	review: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	}
}, { timestamps: true }, { autoIndex: false })

export default mongoose.model('Review', ReviewSchema);