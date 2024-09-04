import Users from '../models/User.js'
import Token from '../models/Token.js'
import jwt from "jsonwebtoken"
import crypto from "crypto"
import bcrypt from "bcryptjs"
import { generateTokens, storeRefreshTokens, setCookies } from "../utilities/token.js"
// import Token from '../models/Token.js'
// import { sendEmail } from "../utilities/sendEmail.js"

export const registerUser = async(req, res) => {
    const { username, password, email } = req.body
        if (!email || !password || !username) {
            return res.status(400).json({ 
                msg: '❌ Please enter all fields',
                statusText: "Fail",
                statusCode: 400
             })
        }
    //  verify email
        let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email.match(emailFormat)) {
            return res.status(400).json({ 
                msg: "❌ Please enter a valid email address❗",
                statusText: "Fail",
                statusCode: 400 
            })
        }
    //verify password
        let passValid=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!password.match(passValid)) {
            return res.status(400).json({ 
                statusText: "Fail",
                statusCode: 400,
                msg: "🚫 Password must be between 8 to 15 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            })
        }

    try {
        // const { userExists } = userExists(email) // check if user exists
        const userExists = await Users.findOne({ email })
        if (userExists) {
            return res.status(400).json({ 
                msg: "🚫 This email already exists!",
                statusText: "Fail",
                statusCode: 400
             })
        }
        const newUser = await Users.create({ username, password, email })
       
        const { refreshToken, accessToken } = generateTokens(newUser._id) // authenticate
        await storeRefreshTokens(newUser._id, refreshToken)
        setCookies(res, accessToken, refreshToken)
        res.status(200).json({
            user: { _id: newUser._id, username: newUser.username, email: newUser.email, accessToken },
            statusText: "ok",
            statusCode: 201,
            message: "User Successfully registered"
        })
    } catch(error) {
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

export const loginStatus = async(req,res) => {
    try {
        const { access_token } = req.cookies
        if (!access_token) {
            return res.status(400).json({
                msg: "🚫 No token found",
                statusText: "Fail",
                statusCode: 400,
                loginStatus: false,
                access_token
            })
        }
        // res.send(access_token)
        const isTokenValid = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
        if (isTokenValid) {
            res.status(200).json({
                msg: "You are Logged in",
                statusText: "ok",
                statusCode: 200,
                loginStatus: true,
                access_token
            })
        }
    } catch (error) {
        if (error) {
            console.log(error)
            res.status(400).json({
                msg: "You are not Logged in",
                statusText: "Fail",
                statusCode: 400,
                error,
                loginStatus: false
            })
        }
    }
}

export const loginUser = async (req, res) => {
    const {password, email} = req.body
    if(!email || !password) {
        return res.status(400).json({msg: '❌ Please fill in all fields'})
    }
    //verify email
    let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email.match(emailFormat)) {
        return res.status(400).json({msg: "❌ Please enter a valid email address❗"})
    }
    // verify password
    let passValid =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!password.match(passValid)) {
        return res.status(400).json({msg: "🚫 Password must be between 8 to 15 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
    }
    // check if user exists
    const userExists = await Users.findOne({email})
    if (!userExists) {
        return res.status(400).json({msg: "🚫 This email does not exist!"})
    }
    const ifPasswordIsCorrect = await bcrypt.compare(password, userExists.password)
    if(!ifPasswordIsCorrect) {
        return res.status(400).json({msg: "🚫 Wrong credentials, please try again❗"})
    }

    try {
        if (userExists && ifPasswordIsCorrect) {
            const { refreshToken, accessToken } = generateTokens(userExists._id) // authenticate
            await storeRefreshTokens(userExists._id, refreshToken)
            setCookies(res, accessToken, refreshToken)
            // console.log(userExists, refreshToken, accessToken)
            res.status(200).json({
                user: { _id: userExists._id, username: userExists.username, email: userExists.email, accessToken },
                statusText: "ok",
                statusCode: 201,
                message: "User Successfully logged in"
            })
        }
    } catch(error) {
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

export const token = async (req, res) => {
    const access_token = await Token.find()
    res.status(200).json({ access_token })
}

export const refreshToken = async(req, res) => {
    try {
        const { refresh_token } = req.cookies
        if (!refresh_token) {
            return res.status(401).json({ msg: "Token not found" })
        }
        const verifyToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        const storedRefreshToken = await Token.findOne({ userId: verifyToken.userId })
       
        if (storedRefreshToken.token !== refresh_token) {
            return res.status(401).json({ msg: "Invalid token!" })
        }
        const newAccessToken = jwt.sign({ userId: verifyToken.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

        res.cookie("newAccessToken", newAccessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
        return res.status(200).json({
            msg: 'New access token created successfully',
            newAccessToken,
            statusCode: 200,
            statusText: 'ok'
        })
        // console.log("\n")
        // console.log("req.cookies =", req.cookies)
        // console.log("\n")
        // console.log("new_access_token =", newAccessToken)
        // console.log("\n")
        // console.log("refresh_token =", refresh_token)
        // console.log("\n")
        // console.log("stored_refresh_token =", storedRefreshToken.token)
        // console.log("\n")
        // console.log((storedRefreshToken.token == refresh_token))
        // console.log("\n")
        // console.log("verifyToken.userId =", verifyToken)
    } catch (error) {
        if (error) {
            res.status(400).json({
                msg: "Something went wrong",
                statusText: "Failure",
                statusCode: 401,
                error
            })
        }
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3MDhiNzBlMTk2YmM0ODU5ZjhkNTIiLCJpYXQiOjE3MjU0NTE1MjQsImV4cCI6MTcyNjA1NjMyNH0.sPwG8zfPm31-UZGQbRjlPK91JB26kOtqh9rCSbMgP7Y

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3MDhiNzBlMTk2YmM0ODU5ZjhkNTIiLCJpYXQiOjE3MjU0NTE1MjQsImV4cCI6MTcyNjA1NjMyNH0.sPwG8zfPm31-UZGQbRjlPK91JB26kOtqh9rCSbMgP7Y