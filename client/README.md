# E-Commerce Backend API

Complete RESTful API for an e-commerce application built with Node.js, Express, and MongoDB.

## 🚀 Features
- ✅ **Authentication & Authorization** - JWT-based auth with role-based access
- ✅ **Product Management** - Full CRUD with images, variants, reviews
- ✅ **Shopping Cart** - Persistent cart with coupon support
- ✅ **Order Management** - Complete order lifecycle
- ✅ **User Profiles** - Profile management with multiple addresses
- ✅ **Search & Filters** - Advanced product search and filtering
- ✅ **Reviews & Ratings** - Product review system
- ✅ **Stock Management** - Real-time inventory tracking

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 6.0
- npm >= 9.0.0

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone 
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your configurations:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
JWT_TOKEN=

ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=

REDIS_URL=
REDIS_PASSWORD=
CLIENT_URL=
```
### 5. Run the server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start on http://localhost:5000

## 📁 Project Structure

```
backend/
├── controllers/          # Request handlers
│   ├── auth.js
│   ├── product.js
│   ├── cart.js
│   ├── order.js
│   └── user.js
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/              # API routes
│   ├── auth.js
│   ├── product.js
│   ├── cart.js
│   ├── order.js
│   └── user.js
├── middleware/          # Custom middleware
│   └── auth.middleware.js
├── utils/               # Utility functions
│   └── seeder.js
├── .env.development         # Environment variables template
├── .env.production         # Environment variables template
├── package.json
└── index.js           # Entry point
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - Login user
GET    /api/auth/me                 - Get current user
POST   /api/auth/logout             - Logout user
PUT    /api/auth/update-password    - Update password
POST   /api/auth/forgot-password    - Request password reset
PUT    /api/auth/reset-password/:token - Reset password
```

### Products
```
GET    /api/products                - Get all products (with filters)
GET    /api/products/search         - Search products
GET    /api/products/featured       - Get featured products
GET    /api/products/:id            - Get single product
GET    /api/products/slug/:slug     - Get product by slug
POST   /api/products                - Create product (Admin)
PUT    /api/products/:id            - Update product (Admin)
DELETE /api/products/:id            - Delete product (Admin)
POST   /api/products/:id/reviews    - Add review (Auth)
DELETE /api/products/:id/reviews/:reviewId - Delete review (Auth)
```

### Cart
```
GET    /api/cart                    - Get user's cart
POST   /api/cart/items              - Add item to cart
PUT    /api/cart/items/:itemId      - Update item quantity
DELETE /api/cart/items/:itemId      - Remove item
DELETE /api/cart                    - Clear cart
POST   /api/cart/coupon             - Apply coupon
DELETE /api/cart/coupon             - Remove coupon
POST   /api/cart/sync               - Sync local cart (guest → logged in)
GET    /api/cart/totals             - Get cart totals
```

### Orders
```
POST   /api/orders                  - Create order
GET    /api/orders/my-orders        - Get user's orders
GET    /api/orders/:id              - Get single order
PUT    /api/orders/:id/cancel       - Cancel order
GET    /api/orders                  - Get all orders (Admin)
PUT    /api/orders/:id/status       - Update order status (Admin)
```

### Users
```
PUT    /api/users/profile           - Update profile
POST   /api/users/addresses         - Add address
PUT    /api/users/addresses/:id     - Update address
DELETE /api/users/addresses/:id     - Delete address
PUT    /api/users/addresses/:id/default - Set default address
```

