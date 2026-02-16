## Ecommerce Application

# Description
- A scalable and secure backend API for an e-commerce application built with the **MERN stack**.  
This service handles authentication, users, products, orders, payments, and admin operations.

---

## 🚀 Features

- User authentication (JWT)
- Role-based access control (Admin / User)
- Product management (CRUD)
- Categories & product filtering
- Shopping cart & checkout
- Order management
- Payment integration (Stripe)
- Secure RESTful API
- Environment-based configuration


---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Stripe API**
- **bcrypt**
- **dotenv**

---

## 📦 **Installation**

Clone the repository:

```bash
git clone https://github.com/Godfrey-cyber/project-name.git
cd server

```

## Run
```bash
npm install
npm run dev
```

http://localhost:5000

VITE_API_URL=http://localhost:7451
VITE_GOOGLE_CLIENT_ID=your_google_client_id

## **Folder Structure**
server/
├── controllers/
├── routes/
├── models/
├── index.jsx
├── .env.production
├── .env.development
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── assets
├── utilities
├── config/
│   ├── db.js
│   └── stripe.js

npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build

## **Author**
[GitHub](https://github.com/Godfrey-cyber/project-name.git)

## 🧪 Testing

__You can test endpoints using:__

- Postman
- Thunder Client
- Insomnia

## Roles

| **Name**     | **Role**      | **Stack**  |
|--------------|---------------|------------|
| **Godfrey**  | Backend       | Node       |
| **Godfrey**  | Frontend      | React/Next |