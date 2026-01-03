import Products from '../models/Products.js'
import slugify from 'slugify'
import mongoose from "mongoose"

export const createProduct = async(req, res) => {
    const { name, desc, price, image, quantity, discount, catId, userId, brand, condition } = req.body
    if (name == "" || desc == "" || price == "" || image == "" || quantity == "" || discount == "" || catId == "" || condition == "" || userId == "" || brand == "") {
        return res.status(400).json({ msg: '❌ Please enter all fields' })
    }

    if (!req.userId) {
      return res.status(400).json("Unauthorized");
    }
    const slug = slugify(title, { lower: true })
    // @Check for duplicate slug
    const existingSlug = await Products.findOne({ slug })
    if (existingSlug) {
      return res.status(409).json({ msg: "🚫 A blog with this title already exists" })
    }
    // @Check for duplicate category
    const existingCategory = await Category.findById(catId);
    if (!existingCategory) {
      return res.status(400).json("Category does not exist");
    }

    // @validate ObjectId format
    if (!mongoose.Schema.Types.ObjectId.isValid(catId)) {
        return res.status(400).json({ msg: '❌ Invalid category Id' })
    }

    try {
        const product = await Products.create({ name, desc, price, image, quantity, discount, catId, userId, brand, condition, slug })
            // await Category.findByIdAndUpdate(catId, {$push:{productId: product._id }})
        return res.status(201).json({data: product, status: 'Success', statusText: "ok", statusCode: 201 })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const { search, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', minPrice, maxPrice, minRating, maxRating, amenities, } = req.query;
        // @Initialize pipeline
        const pipeline = []

        // @Search filter.
        if (search) {
            const regex = new RegExp(search, 'i')
            pipeline.push({
                $match: {
                    $or: [
                        { title: regex },
                        { desc: regex },
                        { category: regex },
                        { brand: regex },
                        { condition: regex },
                        // { 'location.country': regex },
                    ],
                },
            })
        }

        // Price range filter
        if (minPrice || maxPrice) {
            pipeline.push({
                $match: {
                    pricePerNight: {
                        ...(minPrice ? { $gte: Number(minPrice) } : {}),
                        ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
                    },
                },
            })
        }

        // Rating range filter
        if (minRating || maxRating) {
            pipeline.push({
                $match: {
                    averageRating: {
                        ...(minRating ? { $gte: Number(minRating) } : {}),
                        ...(maxRating ? { $lte: Number(maxRating) } : {}),
                    },
                },
            })
        }

        // Sorting
        const sortOrder = order === 'asc' ? 1 : -1
        pipeline.push({ $sort: { [sortBy]: sortOrder } })

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit)
        pipeline.push({ $skip: skip })
        pipeline.push({ $limit: parseInt(limit) })

        pipeline.push({
            $project: {
                title: 1,
                desc: 1,
                category: 1,
                brand: 1,
                location: 1,
                price: 1,
                averageRating: 1,
                createdAt: 1,
                slug: 1,
            },
        })

        const products = await Products.aggregate(pipeline)

        const countPipeline = pipeline.filter((stage) => !('$skip' in stage) && !('$limit' in stage))
        countPipeline.push({ $count: 'total' })
        const countResult = await Products.aggregate(countPipeline)
        const total = countResult[0]?.total || 0

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            products,
        })
        console.log(search)
    // try {


        // const products = searchTerm ? await Products.find({ $text: { $search: searchTerm } }) : await Products.find().sort({ createdAt: -1 })
        // return res.status(200).json({ data: products, status: "Success", count: products.length })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error(error)
        }
    }
}
