import mongoose from "mongoose"

const ProfileSchema = new mongoose.Schema({
	image: { type: String },
    desc: { type: String },
	country: { type: String, required: true },
    county: { type: String },
    subCounty: { type: String },
    station: { type: String },
    address: { type: String }
    phone: { type: String }
}, { timestamps: true })

export default mongoose.model('Profile', ProfileSchema);