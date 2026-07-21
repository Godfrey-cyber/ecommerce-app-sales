import express from 'express'
import { getAllProducts, createProduct, getProduct, updateProduct, getProductsByCategory, deleteProduct, myProducts, getBrands } from "../controllers/products.js"
import { authenticate, restrictTo } from "../utilities/authMiddleware.js"
const router = express.Router()

// @All products Brands 
router.get("/get-brands", getBrands);
// @All products by Category 
router.get("/get-products-by-category/:slug", getProductsByCategory);
// @All 
router.get("/get-products", getAllProducts);
// @Single
router.get("/get-product/:id", getProduct);
// @My products
router.get("/get-my-products", authenticate, myProducts);
// @Create
router.post("/create-product", authenticate, createProduct);
// @Delete
router.delete("/delete-product/:id", authenticate, deleteProduct);
// @Update
router.put("/update-product/:id", authenticate, updateProduct);

export default router;