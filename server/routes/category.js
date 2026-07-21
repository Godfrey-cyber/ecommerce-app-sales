import express from 'express'
import { createCategory, parentCategories, subCategories, categoryTree, categoryBread, categoryProd } from "../controllers/categories.js"
import { authenticate } from "../utilities/authMiddleware.js"
const router = express.Router()

router.post("/create-category", authenticate, createCategory);
router.get("/get-parentCategories", parentCategories);
// @Cats with prod
router.get("/get-productcats", categoryProd);
router.get("/get-categoryTree", categoryTree);
router.get("/get-subCategories/:parentId", subCategories);
router.get("/get-category-with-breadcrumb/:id", categoryBread);

export default router;