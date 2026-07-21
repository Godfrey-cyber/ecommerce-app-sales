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

app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:4000", "http://localhost:5173"],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowdHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
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
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.originalUrl}`, new Date().toISOString());
    next();
});

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/carts", cartRoutes);
app.use("/v1/api/products", productRoutes);
app.use("/v1/api/categories", categoryRoutes);
app.use("/v1/api/reviews", reviewsRoutes);
app.use("/v1/api/orders", orderRoutes);
app.use("/v1/api/payments", paymentRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: `${req.method} - ${req.originalUrl} is not a recognized route.`
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Success 💯! Server running on port: ${PORT} 👍`)
})

CREATE TABLE Orders(
    order_id INT PRIMARY KEY AUTO_INCREMENT, 
    item VARCHAR(100) NOT NULL, 
    amount DECIMAL(10,2) NOT NULL, 
    customer_id INT NOT NULL, 
    CONSTRAINT fk_refer 
        FOREIGN KEY (customer_id) 
        REFERENCES Customers(customer_id)
);

CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    country VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (
    first_name,
    last_name,
    age,
    country,
    gender,
    email,
    password,
    phone,
    role_id,
    is_verified
)
VALUES
('Godfrey', 'Ndiritu', 24, 'Kenya', 'Male', 'godfreyndiritu@gmail.com', 'password123', '0791301109', 5, 1),
('Hassan', 'Null', 26, 'Ethioia', 'Male', 'hassannul@gmail.com', 'password123', '01273997678', 2, 1),
('Fatuma', 'Hamisi', 27, 'Kenya', 'Female', 'rajabfatuma@gmail.com', 'password123', '0738937242', 6, 1);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

INSERT INTO Orders (item, amount, customer_id)
VALUES
('Laptop', 85000.00, 1),
('Mouse', 1500.00, 1),
('Keyboard', 3500.00, 2),
('Monitor', 25000.00, 3),
('Printer', 18000.00, 4),
('Desk', 12000.00, 5),
('Office Chair', 9500.00, 6),
('Headphones', 4500.00, 7),
('Webcam', 6000.00, 8),
('USB Flash Drive', 1200.00, 9),
('External Hard Drive', 11000.00, 10),
('Router', 7500.00, 2),
('Smartphone', 45000.00, 3),
('Tablet', 38000.00, 5),
('Power Bank', 3000.00, 8);

// Product Table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) NOT NULL,
    rating DECIMAL(10,2) NOT NULL,
    reviews_count INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    customer_id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES Customers(id)
);

INSERT INTO Products (title, description, quantity, image, price, discount, rating, reviews_count, email, password, category_id, customer_id)
VALUES
("Fortinet Router", "Get the lattest rouuters for all your tech needs.", 2, "image.jpg", 4000, 10, 1.5, 8, "fortinet@gmail.com", "12345WESD", 2, 3),
("Vivo Power Bank 45000mA", "Get the lattest outfits for all your outfit needs.", 7, "image.jpg", 5500, 15, 3.5, 12, "pbank@gmail.com", "12345WESD", 2, 4);

CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    image VARCHAR(50) NOT NULL
);

INSERT INTO Category (title, description, image)
VALUES
('Apparels', "Get the lattest outfits for all your outfit needs.", "image.jpg"),
('Electromics', "Get the lattest gadgets for all your tech needs.", "image.jpg");


INSERT INTO payments(order_id, payment_method, transaction_reference, amount, payment_status) 
VALUES
(2, 'BANK', 'OYD3BVETEERREK', 614000, 'PENDING'),
(3, 'BANK', 'OYD3BVERUERREK', 535000, 'PENDING'),
(4, 'BANK', 'OYD3BV1ERERREK', 83200, 'PENDING'),
(5, 'BANK', 'OYD3BV1RWERREK', 13400, 'SUCCESS'),
(6, 'PAYPAL', 'OYD3BW1TUERREK', 37900, 'SUCCESS'),
(7, 'PAYPAL', 'OYD3BY1TUERREK', 53340, 'SUCCESS'),
(8, 'PAYPAL', 'OYD3BW1TUERREK', 453000, 'SUCCESS'),
(9, 'PAYPAL', 'OYD3BY1TUERREK', 154000, 'FAILED'),
(10, 'PAYPAL', 'OYD3FV1TUERREK', 202000, 'FAILED'),
(11, 'MPESA', 'OYD3BB1TUERREK', 124300, 'FAILED'),
(13, 'MPESA', 'OYD3BH1TUERREK', 323000, 'REFUNDED'),
(14, 'MPESA', 'OYD3BS1TUERREK', 973000, 'REFUNDED'),
(15, 'MPESA', 'OYD3BH1TUERREK', 723000, 'REFUNDED'),
(17, 'CARD', 'OYD3BVNTUERREK', 112400, 'SUCCESS'),
(18, 'CARD', 'OYD3BVSTUERREK', 513200, 'REFUNDED'),
(19, 'CARD', 'OYD3BVMTUERREK', 670900, 'FAILED'),
(20, 'CARD', 'OYD3BVSTUERREK', 912000, 'PENDING');

INSERT INTO product_images(product_id, image_url, is_primary)
VALUES
(3, 'www.images.tiny.com', TRUE),
(4, 'www.images.tiny2.com', TRUE),
(7, 'www.images.tiny3.com', TRUE),
(8, 'www.images.tiny4.com', TRUE);