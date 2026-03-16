import express from 'express'
import { addToCart, getCart, getOne, updateCartItem, removeCartItem } from "../controllers/cart.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/add-to-cart", addToCart);
router.put("/update-cart-item/:itemId", updateCartItem);
router.delete("/remove-cart-item/:itemId", removeCartItem);
// router.delete("/clear-cart/:cartId", clearCart);
router.get("/get-cart", authenticate, getCart);
router.get("/get-one", getOne);

export default router;