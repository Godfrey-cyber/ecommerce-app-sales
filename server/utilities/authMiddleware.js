import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1]

		if (!token) return res.status(401).json({ message: "Access token required" });
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
			if (error) return res.status(403).json({ message: error.message });
			req.userId = decoded.userId;
	    	next();
		})
	} catch (error) {
		return res.status(401).json({ msg: error.message })
	}
}

export const restrictTo = (...roles) => {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) return res.status(401).json("Access token required")

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
				if (error) return res.status(403).json("Access token required")

				// Attach user data to request
				req.userId = decoded.userId

				// Find the user in the database
				const user = await User.findById(req.userId)
				
				if (!user) return res.status(403).json("User not found")
				// Check if user has required role
				if (!roles.includes(user.role)) {
					return res.status(403).json(`Access denied. You do not have the required role, you are a ${user.role}.`)
				}

				// If everything is okay, proceed to the next middleware
				next()
			})
		} catch (error) {
			return res.status(401).json({ msg: error.message })
		}
	}
}