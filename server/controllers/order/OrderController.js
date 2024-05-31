const Order = require("../../models/OrderModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const updateProductInventory = require("../../services/product/updateInventory");

// Create Order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const orderItems = req.body.orderItems;

  // Update product inventory
  await updateProductInventory(orderItems);

  const order = await Order.create(req.body);
  // Send the response after all updates are done
  res.status(201).json({
    success: true,
    order,
  });
});

// Get Orders
exports.getOrdersByCriteria = catchAsyncErrors(async (req, res, next) => {
  let query = {};

  // Handle customer name or email filter
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    query.$or = [{ "customer.name": regex }, { "customer.number": regex }];
  }

  // Handle orderStatus filter
  if (req.query.orderStatus) {
    query.orderStatus = req.query.orderStatus;
  }

  // Handle paymentStatus filter
  if (req.query.paymentStatus) {
    query.paymentStatus = req.query.paymentStatus;
  }

  // Handle specific date filter
  if (req.query.date) {
    const dateString = req.query.date;
    const date = new Date(dateString);
    // Adjust for timezone
    const offset = date.getTimezoneOffset();
    date.setTime(date.getTime() + offset * 60 * 1000);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    query.createdAt = { $gte: date, $lt: nextDate };
  }

  // Pagination
  const page = parseInt(req.query.page) || 1; // Current page (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default to 10)
  const skip = (page - 1) * limit; // Number of items to skip

  const totalCount = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const orders = await Order.find(query).skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    orders: orders,
  });
});

// Get Single Order
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Update Bulk Order Status
exports.updateBulkOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { ids, paymentStatus, orderStatus } = req.query; // Retrieve parameters from query instead of body

  if (!ids || (!paymentStatus && !orderStatus)) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }

  const updateQuery = {};

  if (paymentStatus) {
    updateQuery.paymentStatus = paymentStatus;
  }

  if (orderStatus) {
    updateQuery.orderStatus = orderStatus;
  }

  // Update orders matching the provided IDs
  const updatedOrders = await Order.updateMany(
    { _id: { $in: ids.split(",") } }, // Split ids string into an array
    { $set: updateQuery },
    { new: true }
  );
  res.status(200).json({
    success: true,
    updatedOrders,
  });
});

// Delete Orders by IDs
exports.deleteOrdersByIds = catchAsyncErrors(async (req, res, next) => {
  const { ids } = req.query; // Retrieve IDs from query parameters
  if (!ids) {
    return res
      .status(400)
      .json({ message: "IDs are required in query parameters" });
  }

  // Delete orders matching the provided IDs
  const deletedOrders = await Order.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
    message: `Deleted ${deletedOrders.deletedCount} orders`,
  });
});

// Update Order
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await Order.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    success: true,
  });
});
