import Products from '../models/Products.js'

export const createProduct = async(req, res) => {
    const { name, desc, price, image, quantity, discount, catId, userId, brand, condition } = req.body
    if (name == "" || desc == "" || price == "" || image == "" || quantity == "" || discount == "" || catId == "" || condition == "" || userId == "" || brand == "") {
        return res.status(400).json({ msg: '❌ Please enter all fields' })
    }

    try {
        const product = await Products.create({ name, desc, price, image, quantity, discount, catId, userId, brand, condition })
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
