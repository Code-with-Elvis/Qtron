import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [300, "Name cannot exceed 300 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: [true, "Slug must be unique"],
      required: [true, "Slug is required"],
      index: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      minlength: [2, "Brand must be at least 2 characters long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    category: {
      type: [String],
      required: [true, "Category is required"],
      validate: {
        validator: function (value: string[]) {
          return value.length >= 1;
        },
        message: "At least one category is required",
      },
    },
    subCategory: {
      type: [String],
      required: [true, "Subcategory is required"],
      validate: {
        validator: function (value: string[]) {
          return value.length >= 1;
        },
        message: "Subcategory must be a string or array of strings",
      },
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (value: string[]) {
          return value.length >= 1;
        },
        message: "At least one image is required",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a non-negative number"],
    },
    listPrice: {
      type: Number,
      required: [true, "List price is required"],
      min: [0, "List price must be a non-negative number"],
    },
    countInStock: {
      type: Number,
      required: [true, "Count in stock is required"],
      min: [0, "Count in stock must be a non-negative integer"],
      validate: {
        validator: Number.isInteger,
        message: "Count in stock must be an integer",
      },
    },
    colors: {
      type: [String],
      required: [true, "At least one color is required"],
      validate: {
        validator: function (value: string[]) {
          return value.length >= 1;
        },
        message: "At least one color is required",
      },
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    deliveryEstimate: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating average cannot be negative"],
      max: [5, "Rating average cannot exceed 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: [0, "Rating count cannot be negative"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---- Virtual property for reviews ----
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

// ---- Create indexes for better query performance ----
productSchema.index({ userId: 1 });
productSchema.index({ name: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ subCategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isPublished: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ isDeal: 1 });
productSchema.index({ ratingsAverage: -1 });
productSchema.index({ ratingCount: -1 });

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
