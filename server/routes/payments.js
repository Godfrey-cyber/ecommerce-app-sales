import express from "express";
import { authenticate, restrictTo } from "../utilities/authMiddleware.js"
import { stripeWebhook, createPaymentIntent } from "../controllers/stripePayment.js"
const router = express.Router()

router.post("/stripe/webhook", express.raw({ type: "application/json" }),  // raw buffer for signature verification
  stripeWebhook
);
router.post("/stripe/create-intent", authenticate, createPaymentIntent);

export default router;