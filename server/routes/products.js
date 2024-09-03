import express from 'express'
import { getAllProducts, createProduct } from "../controllers/products.js"
const router = express.Router()

router.get("/get-products", getAllProducts);
// router.get("/get-product/:id", getProduct);
router.post("/create-product", createProduct);
// router.delete("/delete-product", deleteProduct);
// router.put("/update-product", updateProduct);

export default router;