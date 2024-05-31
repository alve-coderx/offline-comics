const slugify = require("slugify");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Category = require("../../models/CategoryModel");

// Get Categories by Criteria
exports.getCategoriesByCriteria = catchAsyncErrors(async (req, res, next) => {
  let query = {};
  console.log(req.query)
  // Handle name or ID filter
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    query.$or = [{ name: regex }];
  }

  // Handle active status filter
  if (req.query.active) {
    query.active = req.query.active === "true"; // Convert string to boolean
  }

  // Pagination
  const page = parseInt(req.query.page) || 1; // Current page (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default to 10)
  const skip = (page - 1) * limit; // Number of items to skip
  const totalCount = await Category.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  console.log(page)
  const categories = await Category.find(query).skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    categories: categories,
  });
});

// Create Category
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, details } = req.body;
  let myIcon;
  let myBanner;

  if (req.body.icon) {
    myIcon = await cloudinary.uploader.upload(req.body.icon, {
      folder: "avatars", // Folder to upload the icon image
    });
  }
  if (req.body.banner) {
    myBanner = await cloudinary.uploader.upload(req.body.banner, {
      folder: "avatars", // Folder to upload the banner image
    });
  }

  const data = {
    name,
    details,
    slug: slugify(name),
  };

  if (myBanner) {
    data.banner = {
      public_id: myBanner.public_id,
      url: myBanner.secure_url,
    };
  }
  if (myIcon) {
    data.icon = {
      public_id: myIcon.public_id,
      url: myIcon.secure_url,
    };
  }

  const category = new Category(data);
  await category.save();

  res.status(201).json({
    success: true,
    category: category,
  });
});

// Get Category Details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const categorie = await Category.findById(req.params.id);

  if (!categorie) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({
    success: true,
    categorie,
  });
});

// Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Sub Category Delete Successfully",
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  // Find the category by ID
  let category = await Category.findById(req.params.id);

  // If category not found, return error
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // If a new icon image is provided, update it
  if (req.body.icon && req.body.icon !== "") {
    // Delete the existing icon image from Cloudinary
    const iconId = category.icon.public_id;
    await cloudinary.uploader.destroy(iconId);

    // Upload the new icon image to Cloudinary
    const myIcon = await cloudinary.uploader.upload(req.body.icon, {
      folder: "icons",
      width: 150,
      crop: "scale",
    });

    // Update the icon details in the request body
    req.body.icon = {
      public_id: myIcon.public_id,
      url: myIcon.secure_url,
    };
  }

  // If a new banner image is provided, update it
  if (req.body.banner && req.body.banner !== "") {
    // Delete the existing banner image from Cloudinary
    const bannerId = category.banner ? category.banner.public_id : null;
    if (bannerId) {
      await cloudinary.uploader.destroy(bannerId);
    }

    // Upload the new banner image to Cloudinary
    const myBanner = await cloudinary.uploader.upload(req.body.banner, {
      folder: "banners",
      width: 800,
      crop: "scale",
    });

    // Update the banner details in the request body
    req.body.banner = {
      public_id: myBanner.public_id,
      url: myBanner.secure_url,
    };
  }

  // Update the category with the new data
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send success response with updated category
  res.status(200).json({
    success: true,
    category,
  });
});
