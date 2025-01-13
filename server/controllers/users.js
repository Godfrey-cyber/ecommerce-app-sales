import Users from '../models/User.js'
import Token from '../models/Token.js'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import { generateTokens, storeRefreshTokens, setCookies } from "../utilities/token.js"

import { createRefreshToken, createAccessToken, validateEmail, validatePassword } from "../utilities/utiles.js"

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // check all fields
        if (!email || !password || !username) {
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
        const user = new User({ username, email, password });
        await user.save()
        console.log("new registered user", user)
        return res.status(201).json({ msg: "User Registration successfull🥇" })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
// login user
export const loginUser = async(req, res) => {
    try{
        const {password, email} = req.body
        if(!email || !password) {
            return res.status(400).json({msg: '❌ Please fill in all fields'})
        }

        // Validate password format
        try {
            validatePassword(password);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // Validate email format
        try {
            validateEmail(email);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

        // check if user exists
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({msg: "🚫 This email does not exist!"})
        }
       
        const ifPasswordIsCorrect = await bcrypt.compare(password, userExists.password)
        console.log("password correct", ifPasswordIsCorrect)
        if (!ifPasswordIsCorrect) {
            return res.status(400).json({ msg: "🚫 Invalid email or password." });
        }

        // Generate tokens
        const accessToken = createAccessToken(userExists._id);
        const refreshToken = createRefreshToken(userExists._id);

        // Send refresh token to the front-end
        res.cookie('refreshToken', refreshToken, {
            path: "/",
            httpOnly: true,
            maxAge: new Date(Date.now() + 1000 * 86400),
            sameSite: "Strict",
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({ accessToken, msg: "Login successfull🥇" })
    }catch(error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

// change password 
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
        const users = req.query.new ? await Users.find().sort({ createdAt: -1} ).limit(5).select("-password") : await Users.find().select("-password")
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
    const token = await Token.findOne({ userId: req.user._id})
    if (token) {
        await Token.deleteOne()
    }
    res.cookie('access_token', "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
    return res.status(200).json({ message: "User has been successfully logged out" })
}

// refresh token
export const tokenRefresh = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(403).json({ message: "Refresh token not provided" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = createAccessToken(decoded.userId);
        res.status(200).json({ accessToken });
    });
}