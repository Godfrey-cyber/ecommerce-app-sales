import express from 'express'
import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct, myProducts } from "../controllers/products.js"
import { authenticate, restrictTo } from "../utilities/authMiddleware.js"
const router = express.Router()
// @All 
router.get("/get-products", getAllProducts);
// @Single
router.get("/get-product/:id", getProduct);
// @My products
router.get("/get-my-products", authenticate, myProducts);
// @Authentication

// @Create
router.post("/create-product", authenticate, createProduct);
// @Delete
router.delete("/delete-product/:id", authenticate, deleteProduct);
// @Update
router.put("/update-product/:id", authenticate, updateProduct);

export default router;