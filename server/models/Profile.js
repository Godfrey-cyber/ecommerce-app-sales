import mongoose from mongoose

const ProfileSchema = new mongoose.Schema({
	image: { type: String },
    desc: { type: String },
	country: { type: String, required: true },
    city: { type: String },
    address: { type: String }
}, { timestamps: true })

export default mongoose.model('Profile', ProfileSchema);