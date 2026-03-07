import Review from "../models/Products.js"
import slugify from 'slugify'
import mongoose from 'mongoose'

// @Add a Review [ only verified buyer ]
export const addReview = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { productId, rating, comment } = req.body;

        const review = await Review.create(
            [
                {
              product: productId,
                user: req.userId,
                rating,
                comment,
                },
            ],
            { session }
        );

        await session.commitTransaction();

        res.status(201).json({
            success: true,
            review: review[0],
        });

    } catch (error) {
        await session.abortTransaction();

        if (error.code === 11000) {
            return res.status(400).json({
                message: "You have already reviewed this product",
            });
        }

        next(error);
    } finally {
        session.endSession();
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        return res.status(200).json({ message: "Review fetch successfull🥇", review })
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