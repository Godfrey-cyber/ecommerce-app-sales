import jwt from "jsonwebtoken";

//Create Access Token
export const createAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

//Create Refresh Token
export const createRefreshToken = (userId) => {
	return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

// Rate Limit


// Validate email
export const validateEmail = (email) => {
	let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	if (!email.match(emailFormat)) {
	    throw new Error( "❌ Please enter a valid email address❗")
	}
}

// Validate password
export const validatePassword = (password) => {
	let passValid=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

	if (!password.match(passValid)) {
	    throw new Error("🚫 Password must be between 8 to 15 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" )
	}
}

export const allowedUpdates = (product, requestObject, allowedfields) => {
	for(const key of allowedfields) {
		if (requestObject[key] !== undefined) {
			product[key] = requestObject[key]
		}
	}
}