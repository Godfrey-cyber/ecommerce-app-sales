import User from '../models/User.js'
import Token from '../models/Token.js'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import { createRefreshToken, createAccessToken, validateEmail, validatePassword } from "../utilities/utiles.js"

export const registerUser = async (req, res, next) => {
    try {
        const { lastname, firstname, email, password } = req.body;
        // check all fields
        if (!email || !password || !lastname || !firstname) {
            return res.status(400).json({ msg: '❌ Please enter all fields' })
        }

         // Validate password format
        try {
            validatePassword(password); // checks if the password meets the required criteria
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // Validate email format
        try {
            validateEmail(email); // checks if the email contains an @
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        //Create user
        const user = new User({ lastname, firstname, email, password });
        await user.save()
        console.log("new registered user", user)
        return res.status(201).json({ msg: "User Registration successfull🥇" })
    } catch(error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
// login user
export const loginUser = async(req, res, next) => {
    try{
        const {password, email} = req.body
        if(!email || !password) {
            return res.status(400).json({msg: '❌ Please fill in all fields'})
        }

        // @Validate password format
        try {
            validatePassword(password);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // @Validate email format
        try {
            validateEmail(email);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // @check if user exists
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({msg: "🚫 This email does not exist!"})
        }
        // @Check if password is correct
        const ifPasswordIsCorrect = await bcrypt.compare(password, user.password)
        if (!ifPasswordIsCorrect) {
            return res.status(400).json({ msg: "🚫 Invalid email or password." });
        }
        // @Generate tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // Save refresh token in DB
        user.refreshTokens.push({ token: refreshToken });
        await user.save();

        const safeUser = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            verified: user.verify,
        }

        // Send refresh token to the front-end
        res.cookie('refreshToken', refreshToken, {
            path: "/",
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        })
        return res.status(200).json({ user: safeUser, accessToken });
    }catch(error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

// @Change password 
export const changePassword = async(req, res) => {
    try {
        const { previousPassword, password } = req.body;
        // Validate user fields
        if (!previousPassword || !password) return res.status(400).json({ message: "❌ Please enter all fields." });
        // Validate password format
        try {
            validatePassword(password);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
        // Fetch user from the database
        const user = await User.findById(req.userId);

        if (!user) return res.status(401).json({ message: "❌ User not found. Please log in again." });
        // Check if the previous password matches the user's current password
        const isPasswordMatch = await bcrypt.compare(previousPassword, user.password);
        console.log("is password match", isPasswordMatch)

        if (!isPasswordMatch) {
            throw new Error("🚫 Passwords did not match, please try again❗");
        }

        try {
            validatePassword(password); // Throws an error if validation fails
        } catch (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        // Update and save the new password
        user.password = password;
        await user.save();

        res.status(200).json({ message: "✅ Password has been changed successfully!" });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}
// get all users
export const getAllUsers = async(req, res) => {
    try {
        const users = req.query.new ? await User.find().sort({ createdAt: -1} ).limit(5).select("-password") : await User.find().select("-password")
        // const { _id, }
        return res.status(200).json({ 
            users, 
            statusText: "ok",
            statusCode: 200, 
            count: users.length
         })
    } catch (error) {
        if (error) {
            return res.status(400).json({ 
                statusText: "Fail",
                statusCode: 400,
                msg: "🚫 Something went wrong",
                error
            })
        }
    }
}

// logout user
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(400).json({ message: 'No token found' });

        // @Verify Token
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(payload.userId);
        console.log("payload.id", payload.id)
        console.log("payload", payload)
        console.log("user", user)
        if (!user) {
          return res.status(403).json({ message: 'No user found' });
        }

        console.log("Logout", typeof token); // should be "string"
        console.log("Logout", typeof user.refreshTokens[0].token);
       
        // @Remove refresh token from DB
        user.refreshTokens = user.refreshTokens.filter(refToken => refToken.token !== token);
        await user.save();

        // @Clear Cookie
        res.cookie('refreshToken', "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        })
        return res.status(200).json({ message: "User has been successfully logged out" })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
    
}

// @refresh token
export const tokenRefresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(403).json({ message: "Refresh token not provided" });
        // @Verify token
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        // @Get loggedin user
        const user = await User.findById(payload.userId)
        // @Check if user exists
        if (!user || !user.refreshTokens.some(rt => rt.token === token)) {
          return res.status(403).json({ message: "No user found" });
        }

        // @Generate tokens
        const newAccessToken = createAccessToken(payload.userId);
        const newRefreshToken = createRefreshToken(payload.userId);

        // @Replace old refresh token
        user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);
        user.refreshTokens.push({ token: newRefreshToken });
        await user.save();

        // @Send refreshToken
        res.cookie("refreshToken", newRefreshToken, {
          path: "/",
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({ message: error.message });
    }
}