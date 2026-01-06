import mongoose from "mongoose";

// const CategorySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     desc: {
//       type: String,
//       required: false,
//       trim: true,
//     },
//     image: {
//       type: String,
//       required: false,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     parent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       default: null, // null = top-level category
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     // optional but very useful
//     level: {
//       type: Number, // 0 = department, 1 = category, 2 = subcategory
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Category", CategorySchema);



const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ''
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null  // null means it's a parent category
  },
  level: {
    type: Number,
    default: 0,  // 0 = department, 1 = category, 2 = subcategory
    enum: [0, 1]
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0  // for sorting categories
  }
}, {
  timestamps: true
});

// Index for faster queries
CategorySchema.index({ parent: 1, level: 1 });
CategorySchema.index({ slug: 1 });

// Virtual for getting subcategories
CategorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Method to get full category path
CategorySchema.methods.getPath = async function() {
  const path = [this];
  if (this.parent) {
    const parent = await this.model('Category').findById(this.parent);
    if (parent) {
      const parentPath = await parent.getPath();
      path.unshift(...parentPath);
    }
  }
  return path;
};

export default mongoose.model("Category", CategorySchema);