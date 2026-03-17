import express from 'express'
import { createOrder } from "../controllers/order.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/create-order", authenticate, createOrder);
// router.get("/get-orders", authenticate, getOrders);
// router.get("/get-order/id", authenticate, getOrder);
// router.delete("/delete-order/:orderId", authenticate, removeOrder);

export default router;