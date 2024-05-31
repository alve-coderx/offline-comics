const Order = require("../../models/OrderModel");
const Product = require("../../models/ProductModel");
const User = require("../../models/UserModel");
const Slider = require("../../models/SliderModel");
const Store = require("../../models/StoreModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Banner = require("../../models/BannerModel");
const ErrorHandler = require("../../utlis/errorhander");
const cloudinary = require("cloudinary");

// Get Sliders
exports.getSlider = catchAsyncErrors(async (req, res, next) => {
  let slider;
  if (req?.query?.active) {
    slider = await Slider.find({ active: true });
  } else {
    slider = await Slider.find({});
  }

  res.status(200).json({
    success: true,
    slider,
  });
});

// Get Banners
exports.getBanners = catchAsyncErrors(async (req, res, next) => {
  const banners = await Banner.find({});
  res.status(200).json({
    success: true,
    banners,
  });
});

// Get Slider by ID
exports.getSingleSlider = catchAsyncErrors(async (req, res, next) => {
  const slider = await Slider.findById(req.params.id);
  if (!slider) {
    return next(new ErrorHandler("slider not found", 404));
  }
  res.status(200).json({
    success: true,
    slider,
  });
});

// Delete Slider
exports.deleteSlider = catchAsyncErrors(async (req, res, next) => {
  const slider = await Slider.findById(req.params.id);

  if (!slider) {
    return next(new ErrorHandler("slider not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < slider.images.length; i++) {
    await cloudinary.v2.uploader.destroy(slider.images[i].public_id);
  }

  await slider.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item Deleted Successfully",
  });
});

// Delete Banner
exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(new ErrorHandler("banner not found", 404));
  }

  await cloudinary.v2.uploader.destroy(banner.image.public_id);
  await banner.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item Deleted Successfully",
  });
});

// Update Slider
exports.updateSlider = catchAsyncErrors(async (req, res, next) => {
  let slider = await Slider.findById(req.params.id);
  const image = req?.body?.image;
  const activate = req?.body?.activate;
  const newArrayImage = req?.body?.newArrayImage;

  if (!slider) {
    return next(new ErrorHandler("slider not found", 404));
  }

  if (image?.public_id) {
    // Deleting Images From Cloudinary
    await cloudinary.v2.uploader.destroy(image.public_id);

    // remove image from the images array
    slider.images = slider.images.filter(
      (bImage) => bImage.public_id !== image.public_id
    );
    await slider.save();
  }

  if (activate) {
    await Slider.updateMany({}, { $set: { active: false } });

    slider.active = activate;
    // Save the updated banner with the modified images array
    await slider.save();
  }

  if (newArrayImage) {
    let images = [];
    if (typeof req.body.newArrayImage === "string") {
      images.push(req.body.newArrayImage);
    } else {
      images = req.body.newArrayImage;
    }

    if (images !== undefined) {
      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      slider = await Slider.findByIdAndUpdate(
        req.params.id,
        { $set: { images: [...slider.images, ...imagesLinks] } },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      await slider.save();
    }
  }
  res.status(200).json({
    success: true,
    message: "Item Deleted Successfully",
  });
});

// Update banner
exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  let banner = await Banner.findById(req.params.id);
  const newImage = req?.body?.newImage;
  const { title, subtitle, price, discount, productlink, expiryDate } =
    req.body;
  if (!banner) {
    return next(new ErrorHandler("banner not found", 404));
  }
  if (newImage) {
    // Deleting Images From Cloudinary
    if (req.body.image) {
      await cloudinary.v2.uploader.destroy(req.body.image);
    }

    // upload new image
    const data = {
      public_id: "",
      url: "",
    };

    const result = await cloudinary.v2.uploader.upload(newImage, {
      folder: "products",
    });

    // save in database
    data.public_id = result.public_id;
    data.url = result.url;

    banner = await banner.findByIdAndUpdate(
      req.params.id,
      { $set: { image: data } },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    await banner.save();
  }

  banner.title = title;
  banner.subtitle = subtitle;
  banner.price = price;
  banner.discount = discount;
  banner.productlink = productlink;
  banner.expiryDate = expiryDate;

  await banner.save();

  res.status(200).json({
    success: true,
    message: "Item Updated Successfully",
  });
});

// Create Slider
exports.createSlider = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "avatar",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const slider = await Slider.create(req.body);

  res.status(200).json({
    success: true,
    slider,
  });
});

// Create Banner
exports.createBanner = catchAsyncErrors(async (req, res, next) => {
  const { title, subtitle, price, discount, productlink } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "avatar",
  });
  const data = {
    title,
    subtitle,
    price,
    discount,
    productlink,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const banner = await Banner.create(data);

  res.status(200).json({
    success: true,
    banner,
  });
});

// Get Store
exports.getStore = catchAsyncErrors(async (req, res, next) => {
  const store = await Store.find();

  res.status(200).json({
    success: true,
    store: store[0],
  });
});

exports.getStoreOverview = catchAsyncErrors(async (req, res, next) => {
  // Count the total number of orders
  const totalOrders = await Order.countDocuments();

  // Count the total number of products
  const totalProducts = await Product.countDocuments();

  // Count the total number of users
  const totalUsers = await User.countDocuments();

  // Count the total number of admins (users with role 'admin')
  const totalAdmins = await User.countDocuments({ role: "admin" });

  // Calculate the time one hour ago
  const oneHourAgo = new Date(Date.now() - 3600000); // 3600000 milliseconds = 1 hour

  // Retrieve new orders created within the last one hour
  const newOrders = await Order.find({ createdAt: { $gte: oneHourAgo } });

  res.status(200).json({
    success: true,
    totalOrders,
    totalProducts,
    totalUsers,
    totalAdmins,
    newOrders,
  });
});

// Update Store
exports.updateStore = catchAsyncErrors(async (req, res, next) => {
  let data;
  if (req.body.avatar) {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
    });
    data = {
      ...req.body,
      logo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };
  } else if (req.body.favicon) {
    const result = await cloudinary.v2.uploader.upload(req.body.favicon, {
      folder: "avatar",
    });
    data = {
      ...req.body,
      favicon: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };
  } else {
    data = req.body;
  }

  await Store.findByIdAndUpdate(req.params.id, data);
  res.status(201).json({
    success: true,
  });
});
