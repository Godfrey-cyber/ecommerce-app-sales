simport express from 'express'
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
import reviewsRoutes from "./routes/reviews.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"
import paymentRoutes from "./routes/payments.js"

// import authRoutes from "./routes/user.js"

const app = express()
const PORT = process.env.PORT || 8080;
// app.use(authMiddleware)
app.use(express.json());
app.use(cookieParser())

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:4000"]
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:4000"],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowdHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

connectDb() // MONGODB_URL

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString() 
  });
});

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.originalUrl}`);
    next();
});

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/carts", cartRoutes);
app.use("/v1/api/products", productRoutes);
app.use("/v1/api/categories", categoryRoutes);
app.use("/v1/api/reviews", reviewsRoutes);
app.use("/v1/api/orders", orderRoutes);
app.use("/v1/api/payments", paymentRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ success: false, msg: `${req.method} - ${req.originalUrl} is not a recognized route.` });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Success 💯! Server running on port: ${PORT} 👍`)
})