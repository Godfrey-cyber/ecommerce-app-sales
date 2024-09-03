import jwt from "jsonwebtoken"
import Users from "../models/User.js"

export const protect = async(req, res, next) => {
	try {
		const { access_token } = req.cookies

		if(!access_token) return res.status(401).json({msg: 'You are not authorized!.'})

		const isTokenVerified = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
		if (!isTokenVerified) {
			return res.status(401).json({msg: 'Sorry! Your are not authorized.'})
		}
		const user = await Users.findById(isTokenVerified.userId).select('-password')
		if (!user) {
			return res.status(401).json({msg: 'Aaawk! User not found.'})
		}
		req.user = user
		next()
	} catch (error) {
		if (error) {
			return res.status(401).json({msg: 'Sorry! User is not Authorized, please login.'})
		}
	}
}