import Review from "../models/Reviews.js"
import Order from "../models/Order.js"
import Product from "../models/Products.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @Add a Review [ only verified buyer ]
export const addReview = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        const { id, rating, comment } = req.body;
        console.log(id, rating, comment, req.userId)
        console.log("userId", req.userId)

        // Gate: must have a delivered order with this product
        // const purchasedOrder = await Order.findOne({
        //     user: req.userId,
        //     'items.product': id,
        //     status: 'pending',
        // });
     
        // if (!purchasedOrder) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'You can only review products you have purchased and received.',
        //     });
        // }

        // Gate: one review per user per product (index also enforces this)
        const existing = await Review.findOne({ product: id, user: req.userId });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'You have already reviewed this product.',
            });
        }

        const review = await Review.create(
            {
                product: id,
                userId: req.userId,
                rating: Number(rating),
                comment,
            },
            // { session }
        );

        // await session.commitTransaction();

        return res.status(201).json({
            success: true,
            message: 'Review submitted successfully.',
            review,
        });

    } catch (error) {
        // await session.abortTransaction();
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You have already reviewed this product",
            });
        }

        next(error);
    }
    // } finally {
        // session.endSession();
    // }
};

export const getAllReviews = async (req, res) => {
    try {
        const { reviewId } = req.params
        const reviews = await Review.find()
        return res.status(200).json({ message: "Review fetch successfull🥇", reviews })
    } catch (error) {
        return res.status(401).json(error)
    }
}

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await Review.find({ product: productId }) //.populate('user', 'firstname lastname');
        return res.status(200).json({ message: "Review fetch successfull🥇", reviews })
    } catch (error) {
        return res.status(401).json(error)
    }
}

// @Single Review
export const getReview = async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.findById(id)
        return res.status(200).json({ message: "Review fetch successfull🥇", review })
    } catch (error) {
        return res.status(401).json(error)
    }
}