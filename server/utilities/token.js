import jwt from "jsonwebtoken"
import Users from "../models/User.js"
import Token from "../models/Token.js"
// import { redis } from "../redis.js"
import redis from "redis"
import dotenv from "dotenv"

dotenv.config()

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })
    return {
        refreshToken,
        accessToken
    }
}
    // store token in Db
export const storeRefreshTokens = async (userId, refreshToken) => {
    const token = await Token.findOne({ userId })
    if (token) {
        await Token.deleteOne()
    }
    await new Token({
        userId,
        token: refreshToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 7 * 24 * 60 * 1000 // -> 7 days
    }).save()
}

export const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    })
    res.cookie("refresh_token", refreshToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 1000
    })
    // return accessToken
}

// Create a Redis client
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Handle Redis connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});