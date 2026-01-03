import express from 'express'
import { createCategory } from "../controllers/categories.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/create-category", authenticate, createCategory);
// router.get("/get-product/:id", getProduct);
// router.post("/create-product", authenticate, createProduct);
// router.delete("/delete-product", deleteProduct);
// router.put("/update-product", updateProduct);

export default router;