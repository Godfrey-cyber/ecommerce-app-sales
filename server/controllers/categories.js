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
// 
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
// @Get parent categories
export const parentCategories = async (req, res) => {
  try {
    const parentCat = await Category.find({ 
      level: 0, 
      isActive: true 
    })
    .sort({ order: 1, title: 1 })
    .select('title slug description image');

    res.json({
      success: true,
      data: parentCat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @Get subcategories
export const subCategories = async (req, res) => {
  try {
    const { parentId } = req.params;
    
    const subcategories = await Category.find({
      parent: parentId,
      level: 1,
      isActive: true
    })
    .sort({ order: 1, title: 1 })
    .select('title slug description image parent');

    res.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
// @Category tree
export const categoryTree = async (req, res) => {
  try {
    const parentCategories = await Category.find({ 
      level: 0, 
      isActive: true 
    })
    .sort({ order: 1, title: 1 });

    const tree = await Promise.all(
      parentCategories.map(async (parent) => {
        const subcategories = await Category.find({
          parent: parent._id,
          level: 1,
          isActive: true
        })
        .sort({ order: 1, title: 1 });

        return {
          _id: parent._id,
          title: parent.title,
          slug: parent.slug,
          description: parent.description,
          image: parent.image,
          subcategories: subcategories.map(sub => ({
            _id: sub._id,
            title: sub.title,
            slug: sub.slug,
            description: sub.description,
            image: sub.image
          }))
        };
      })
    );

    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @Single category with breadcrumbs
export const categoryBread = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id).populate('parent');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const breadcrumb = await category.getPath();

    res.json({
      success: true,
      data: {
        category,
        breadcrumb: breadcrumb.map(cat => ({
          _id: cat._id,
          title: cat.title,
          slug: cat.slug
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};