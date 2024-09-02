import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from 'mongoose'
import helmet from 'helmet'

import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
// import authRoutes from "./routes/user.js"

dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ]
    credentials: true
}))

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8080

mongoose.connect(MONGO_URL);
mongoose.connection.on("disconnected", (error) => {
    console.log("❌ MongoDatabase disconnected❗", error)
});

// app.use("/v1/api/user", userRoutes);
app.use("/v1/api/post", postRoutes);
// app.use("/v1/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Success 💯! Database running on port: ${PORT} 👍`))