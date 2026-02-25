import express from 'express'
import { addToCart, getCart, getOne, updateCartItem } from "../controllers/cart.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/add-to-cart", addToCart);
router.put("/update-cart-item/:itemId", updateCartItem);
router.get("/get-cart", getCart);
router.get("/get-one", getOne);

export default router;