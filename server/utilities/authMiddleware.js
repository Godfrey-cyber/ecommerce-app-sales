import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// export const authenticate = (req, res, next) => {
// 	try {
// 		const token = req.headers.authorization?.split(" ")[1]
// 		// const token = req.cookies.accessToken;

// 		if (!token) return res.status(401).json({ message: "Access token is required." });
// 		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
// 			if (error) return res.status(403).json({ message: error.message });
// 			req.userId = decoded.userId;
// 	    	next();
// 		})
// 	} catch (error) {
// 		return res.status(401).json({ msg: error.message })
// 	}
// }

export const authenticate = async (req, res, next) => {
	try {
		const { accessToken } = req?.cookies;
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Your are not authorized! Please login.',
            });
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.',
            });
        }

        req.user = user;
        req.userId = user._id;
        next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired.',
                code: 'TOKEN_EXPIRED',
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid access token.',
        });
	}
}

export const restrictTo = (...roles) => { // restrictTo
	return async (req, res, next) => {
		try {
			const { accessToken } = req?.cookies;

			if (!accessToken) return res.status(401).json("Access token required")

			jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
				if (error) return res.status(403).json("Access token required")

				// Attach user data to request
				req.userId = decoded.userId

				// Find the user in the database
				const user = await User.findById(req.userId)
				
				if (!user) return res.status(403).json("User not found")
				// Check if user has required role
					req.user = user;
        			// req.userId = user._id;

				const userRole = user.role.toLowerCase().trim();
                const allowedRoles = roles.map(r => r.toLowerCase().trim());


				if (!allowedRoles.includes(userRole)) {
					return res.status(403).json(`Access denied. You are a ${user.role}.`)
				}
				next()
			})
		} catch (error) {
			return res.status(401).json({ msg: error.message })
		}
	}
}

// export const rateLimit = async (req, res, next) => {
// 	try {
// 		const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.socket.remoteAddress;
// 		const routeLimits = {
// 	      '/users/login-users': process.env.NODE_ENV === 'production' ? 10 : 100,      // 10 login attempts per minute
// 	      '/users/signup-users': process.env.NODE_ENV === 'production' ? 5 : 100,       // 5 signup attempts per minute
// 	      '/users/token_refresh': process.env.NODE_ENV === 'production' ? 60 : 100,     // 60 refresh attempts per minute
// 	      'default': 30
// 	    };

// 	const route = req.path;
//     const limit = routeLimits[route] || routeLimits.default;

//     const key = `ratelimit:${ip}:${route}`;

//     if (requests > limit) {
// 	    console.log(`❌ Rate limit exceeded for ${ip} on ${route}`);
// 	    return res.status(429).json({ 
// 	        error: "Too many requests, slow down!",
// 	        retryAfter: 60,
// 	        requestCount: requests,
// 	        limit: limit
// 	    });
//     }
//     next();

// 	} catch (error) {
// 		console.error("Rate Limit Error:", error)
//     	next();
// 	}
// }