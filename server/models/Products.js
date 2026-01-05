import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
	title: { 
		type: String, unique: true, required: [true, "🚫 A Product must have a title"]
	 },
	description: { 
		type: String, required: [true, "A Product must have a description"] 
	},
	image: { 
		type: String,
		default: "https://sky.garden/assets/loading-spinners.svg",
	},
	condition: {
		type: String, required: true, enum: ["New", "Refurblished", "Home Made", "Generic"], default: "New"
	},
	brand: { 
		type: String,
		default: ''
	},
	specifications: {
	    type: Map,
	    of: String,
	    default: {}
	},
	isActive: { 
		type: Boolean
	},
	attributes: {
	  type: mongoose.Schema.Types.Mixed
	},
	rating: {
	    type: Number,
	    default: 0,
	    min: 0,
	    max: 5
	},
	review: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Review",
	},
	stock: { 
		type: Number, required: [true, "A Product must have a quantity"], default: 1, min: 0
	},
	price: { 
		type: Number, min: 0, required: [true, "A Product must have a price"]
	},
	discount: { 
		type: Number, default: 0,
	},
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "User", required: [true, "A Product must belong to a user"] 
	},
	slug: {
		type: String, required: true, unique: true, lowercase: true, index: true,
	},
	category: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Category", required: [true, "A Product must belong to a Category"] 
	}
}, { timestamps: true } )

// Indexes
ProductSchema.index({ category: 1 });
ProductSchema.index({ parentCategory: 1 });
// ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ '$**': 'text' })

export default mongoose.model('Product', ProductSchema);