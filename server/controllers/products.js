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
    const searchTerm = req.query.search
    console.log(searchTerm)
    try {
        const products = searchTerm ? await Products.find({ $text: { $search: searchTerm } }) : await Products.find().sort({ createdAt: -1 })
        return res.status(200).json({ data: products, status: "Success", count: products.length })
    } catch (error) {
        return res.status(401).json({msg: error})
    }
}
