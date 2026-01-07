import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDb } from "./config/db.js"
// import { authMiddleware } from "../utilities/authMiddleware.js"

import userRoutes from "./routes/users.js"
import productRoutes from "./routes/products.js"
import categoryRoutes from "./routes/category.js"

// import authRoutes from "./routes/user.js"

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

connectDb() // MONGODB_URL

app.use((req, res) => {
  console.log(`${req.method} ${req.originalUrl}`);
});

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/products", productRoutes);
app.use("/v1/api/categories", categoryRoutes);
console.log(process.env.CLIENT_URL)
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// if (process.env.NODE_ENV === 'development') {
//   setInterval(() => {
//     const used = process.memoryUsage().heapUsed / 1024 / 1024;
//     console.log(`Heap: ${used.toFixed(2)} MB`);
//   }, 10000);
// }

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Success 💯! Database running on port: ${process.env.PORT} 👍`)
})