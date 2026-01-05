import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from 'mongoose'
// import { authMiddleware } from "../utilities/authMiddleware.js"

import userRoutes from "./routes/users.js"
import productRoutes from "./routes/products.js"
import categoryRoutes from "./routes/category.js"

// import authRoutes from "./routes/user.js"

dotenv.config()


const app = express()
// app.use(authMiddleware)
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
    ],
    credentials: true
}))

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8080

mongoose.connect(MONGO_URL);
mongoose.connection.on("disconnected", (error) => {
    console.log("❌ MongoDatabase disconnected❗", error)
});

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/products", productRoutes);
app.use("/v1/api/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Success 💯! Database running on port: ${PORT} 👍`)
})