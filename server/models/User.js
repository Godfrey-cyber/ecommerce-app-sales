import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    firstname: { type: String, min: 4, required: true, trim: true },
	lastname: { type: String, min: 4, required: true, trim: true },
    password: { type: String, required: true, select: false },
	email: { type: String, required: true, lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ], },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    refreshTokens: [{ token: String, createdAt: { type: Date, default: Date.now } }],
    verified: { type: Boolean, default: false }
}, { timestamps: true })

//encrypt password before saving the user
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next()
    } else {
    //hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.password, salt)   
        this.password = hash
        next()
    }
})

export default mongoose.model("User", UserSchema)