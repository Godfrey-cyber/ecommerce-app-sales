import express from 'express'
import { addReview, getAllReviews, getReview, getProductReviews } from "../controllers/reviews.js"
import { authenticate, restrictTo } from "../utilities/authMiddleware.js"
const router = express.Router()

// @All Reviews
router.get("/get-reviews", getAllReviews);
router.get("/get-reviews/:productId", getProductReviews);
// @Single Reviews
router.get("/get-review/:id", getReview);
// @My Reviews
// router.get("/get-my-reviews", authenticate, myReviews);
// @Add a Review 
router.post("/create-review", authenticate, addReview);
// @Delete A Review
// router.delete("/delete-review/:id", authenticate, deleteReview);
// @Update Review
// router.put("/update-review/:id", authenticate, updateReview);

export default router;