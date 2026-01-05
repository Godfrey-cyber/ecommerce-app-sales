import express from 'express'
import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../controllers/products.js"
import { authenticate, restrictTo } from "../utilities/authMiddleware.js"
const router = express.Router()

router.get("/get-products", getAllProducts);
router.get("/get-product/:id", getProduct);
router.post("/create-product", authenticate, createProduct);
router.delete("/delete-product/:id", authenticate, deleteProduct);
router.put("/update-product/:id", authenticate, updateProduct);

export default router;