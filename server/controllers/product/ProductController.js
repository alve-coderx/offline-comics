const Product = require("../../models/ProductModel");
const Category = require("../../models/CategoryModel");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utlis/errorhander");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const imagesLinksArr = [];

  if (req?.body?.images?.length > 0) {
    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.uploader.upload(req.body.images[i], {
        folder: "products",
      });

      imagesLinksArr.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinksArr;
  }
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get Products
exports.getProductsByCriteria = catchAsyncErrors(async (req, res, next) => {
  let query = {};
  // Handle category filter
  if (req.query.category) {
    query.category = req.query.category;
  }
  // Handle tags filter
  if (req.query.tags) {
    query.tags = req.query.tags;
  }
  // Handle price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) {
      query.price.$gte = req.query.minPrice;
    }
    if (req.query.maxPrice) {
      query.price.$lte = req.query.maxPrice;
    }
  }
  // Handle search query
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    query.$or = [{ name: regex }, { tags: regex }];
  }
  // Pagination
  const page = parseInt(req.query.page) || 1; // Current page (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default to 10)
  const skip = (page - 1) * limit; // Number of items to skip

  const totalCount = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const products = await Product.find(query).skip(skip).limit(limit);

  res.status(201).json({
    success: true,
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    products: products,
  });
}); 
exports.getProductsByCategoryIds = catchAsyncErrors(async (req, res, next) => {
  const { categoryNames } = req.query;
  // Check if categoryNames is provided and is an array
  if (!categoryNames || !Array.isArray(categoryNames)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Category names must be provided as an array",
      });
  }

  try {
    const productsByCategory = [];

    for (const categoryName of categoryNames) {
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
      
      if (category) {
        // If category found, find products associated with it
        const products = await Product.find({ category: category._id });
        productsByCategory.push({
          id: category._id,
          name: category.name,
          products: products,
        });
      }
    }

    res.status(200).json({ success: true, productsByCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Get Product By ID
exports.getProductByID = catchAsyncErrors(async (req, res, next) => {
  // Fetch the product by ID and populate the category and inventory fields
  const product = await Product.findById(req.params.id)
    .populate("category", "name") // Populates the category field and selects only the 'name' field
    .populate("inventory", "quantity"); // Populates the inventory field and selects only the 'quantity' field

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query); // Log the query parameters for reference

  const productIds = req.query.ids; // Assuming IDs are sent in the query string

  // Check if IDs are provided
  if (!productIds || productIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Product IDs are required in the query" });
  }

  // Convert productIds to an array if it's a comma-separated string
  const idsArray = Array.isArray(productIds)
    ? productIds
    : productIds.split(",");

  // Delete products by IDs
  const result = await Product.deleteMany({ _id: { $in: idsArray } });

  // Check if any products were deleted
  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: "No products found with the provided IDs" });
  }

  res.status(200).json({
    success: true,
    message: "Product(s) deleted successfully",
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  const imagesLinksArr = [];

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  // Remove deleted images from Cloudinary and product.images array
  if (req?.body?.deletedImage) {
    await cloudinary.uploader.destroy(req.body.deletedImage);
    req.body.images = product.images.filter(
      (image) => req.body.deletedImage !== image.public_id
    );
  }

  if (req?.body?.newImages?.length > 0) {
    for (let i = 0; i < req.body.newImages.length; i++) {
      const result = await cloudinary.uploader.upload(req.body.newImages[i], {
        folder: "products",
      });

      imagesLinksArr.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  req.body.images = [...req.body.images, ...imagesLinksArr];

  // Update the product in the database
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    isUpdated: true,
    product,
  });
});
