import Category from "../models/Category.js"
import slugify from 'slugify'

// Create category (admin)
export const createCategory = async (req, res) => {
  try {
    const { title, description, parent, level, image, order } = req.body;

    // If it's a subcategory, verify parent exists and is a parent category
    if (parent && level === 1) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory || parentCategory.level !== 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parent category'
        });
      }
    }

    const slug = slugify(title, { lower: true })
    // @Check for duplicate slug
    const existingSlug = await Category.findOne({ slug })
    if (existingSlug) {
      return res.status(409).json({ msg: "🚫 A cat with this title already exists" })
    }

    const category = await Category.create({
      title,
      slug,
      description,
      parent: parent || null,
      level: level || 0,
      image,
      order
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

