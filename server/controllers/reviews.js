import Review from "../models/Reviews.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @Add a Review [ only verified buyer ]
export const addReview = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        const { id, rating, comment } = req.body;
        console.log(id, rating, comment)

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