import express from 'express'
import { getAllProducts, createProduct } from "../controllers/products.js"
import { protect } from "../middleWare/authMiddleware.js"
const router = express.Router()

router.get("/get-products", getAllProducts);
// router.get("/get-product/:id", getProduct);
router.post("/create-product", protect, createProduct);
// router.delete("/delete-product", deleteProduct);
// router.put("/update-product", updateProduct);

export default router;