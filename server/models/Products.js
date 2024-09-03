import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
	name: { 
		type: String, unique: true, required: [true, "A Product must have a title"]
	 },
	desc: { 
		type: String, required: [true, "A Product must have a description"] 
	},
	image: { 
		type: String,
		default: "https://sky.garden/assets/loading-spinners.svg"
	},
	condition: {
		type: String, required: true, enum: ["New", "Refurblished", "Home Made", "Generic"], default: "New"
	},
	review: { 
		type: mongoose.Schema.ObjectId, 
		ref: "Review"
	},
	quantity: { 
		type: Number, required: [true, "A Product must have a quantity"], default: 1
	},
	price: { 
		type: Number, required: [true, "A Product must have a price"]
	},
	discount: { 
		type: Number, default: 0,
	},
	userId: { 
		type: mongoose.Schema.ObjectId, ref: "User", 
		required: [true, "A Product must belong to a user"] 
	},
	catId: { 
		type: mongoose.Schema.ObjectId, 
		ref: "Category", required: [true, "A Product must belong to a Category"] 
	}
}, { timestamps: true } )

ProductSchema.index({ '$**': 'text' })

export default mongoose.model('Product', ProductSchema);