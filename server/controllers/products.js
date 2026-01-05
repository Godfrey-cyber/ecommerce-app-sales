import Products from '../models/Products.js'
import Category from '../models/Category.js'
import DeletionAudit from "../models/DelAudit.js"
import slugify from 'slugify'
import mongoose from "mongoose"
import { allowedUpdates } from "../utilities/utiles.js"

export const createProduct = async(req, res) => {
    const { title, description, price, image, stock, discount, category, brand, condition, specifications, attributes, rating, review } = req.body

    if (title === "" || description === "" || price === "" || stock === "" || condition === "" || brand === "") {
        return res.status(400).json({ msg: '❌ Please enter all fields' })
    }

    if (!req.userId) {
      console.log(req.userId)  
      return res.status(400).json("Unauthorized");
    }
    const slug = slugify(title, { lower: true })
    // @Check for duplicate slug
    const existingSlug = await Products.findOne({ slug })
    if (existingSlug) {
      return res.status(409).json({ msg: "🚫 A product with this title already exists" })
    }

    // @validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ msg: '❌ Invalid category Id' })
    }
    // @Check for duplicate category
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json("Category does not exist");
    }

    try {
        const product = await Products.create({ title, description, price, image, discount, category, user: req.userId, brand, condition, slug, specifications, attributes, stock, rating, review })
            // await Category.findByIdAndUpdate(category, {$push:{productId: product._id }})
        return res.status(201).json({data: product, status: 'Success', statusText: "ok", statusCode: 201 })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const { search, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', minPrice, maxPrice, minRating, maxRating, brand } = req.query;
        // @Initialize pipeline
        const pipeline = []

        // @Search filter. console
        if (search) { // searchTerm
            const regex = new RegExp(search, 'i')
            pipeline.push({
                $match: {
                    $or: [
                        { title: regex },
                        { description: regex },
                        { category: regex },
                        { brand: regex },
                        { condition: regex },
                        // { 'location.country': regex },
                    ],
                },
            })
        }
        // Brand filter
        if (brand) {
            const regex = new RegExp(brand, 'i')
            pipeline.push({
                $match: {
                    brand: regex
                }
            })
        }

        // Price range filter
        if (minPrice || maxPrice) {
            pipeline.push({
                $match: {
                    price: {
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
                description: 1,
                category: 1,
                brand: 1,
                stock: 1,
                price: 1,
                rating: 1,
                createdAt: 1,
                slug: 1,
                user: 1,
            },
        })

        const products = await Products.aggregate(pipeline)

        const countPipeline = pipeline.filter((stage) => !('$skip' in stage) && !('$limit' in stage) && !('$project' in stage))
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
    } catch (error) {
        console.error(error)
        return res.status(401).json(error)
    }
}
// @Single Product
export const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Products.findById(id)
        return res.status(200).json({ message: "Product fetch successfull🥇", product })
    } catch (error) {
        return res.status(401).json(error)
    }
}

// @Get my products
export const myProducts = async (req, res) => {
    try {
        // @validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(400).json({ msg: '❌ Invalid product Id' })
        }
        // @Get hthe product
        const products = await Products.find({ user: req.userId }).populate('user', 'firstName email').sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            // count: products.length,
            products,
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json(error)
    }
}

// @Edit Product
export const updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        // @validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: '❌ Invalid product Id' })
        }

        const product = await Products.findById(id)
        if (!product) {
            return res.status(403).json({ success: false, message: 'Product not found.' })
        }
        const userID = product.user
        if (req.userId !== userID.toString()) {
            return res.status(403).json({ success: false, message: 'You must be an Admin or the owner of this product' })
        }

        const allowedFields = [
            'title',
            'description',
            'price',
            'rating',
            'category',
            'discount',
            'stock',
            'condition',
            'brand',
        ]

        allowedUpdates(product, req.body, allowedFields)
        const updated = await product.save()
        res.status(200).json({
            success: true,
            message: `✅ ${product.title} - has been updated successfully!`,
            updated,
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json(error)
    }
}

// @Delete Product
export const deleteProduct = async (req, res) => {
    const { id, entityType, entityId, title, price, category, deletedBy, reason } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: '❌ Invalid product Id' })
        }
        // @get-product
        const product = await Products.findById(id)
        // @check if product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }
        // @Check if owner
        const userID = product.user
        if (req.userId !== userID.toString()) {
            return res.status(403).json({ success: false, message: 'You must be an Admin or the owner of this product' })
        }
        // 🔐 AUDIT LOG (before delete)
        await DeletionAudit.create({
            entityType,
            entityId: product._id,
            title: product.title,
            price: product.price,
            category: product.category,
            deletedBy: req.user.id, // from auth middleware
            reason,
        });
        // @Delete the product
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: "Product has been deleted successfully!",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error while deleting product' })
    }   
}