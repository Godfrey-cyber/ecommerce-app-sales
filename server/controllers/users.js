import Users from '../models/User.js'
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
        // await storeRefreshTokens(newUser._id, refreshToken)
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
            // await storeRefreshTokens(newUser._id, refreshToken)
            setCookies(res, accessToken, refreshToken)
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
