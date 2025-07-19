const Category = require('../models/category.models');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse.util');

// @desc    Get all categories
// @route   GET /api/v1/categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Create category
// @route   POST /api/v1/categories
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    data: category
  });
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
exports.updateCategory = asyncHandler(async (req, res, next) => {
  // Prevent name changes
  if (req.body.name) {
    return next(new ErrorResponse('Category name cannot be changed', 400));
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
      new: true,
      runValidators: true
    }
  );

  if (!category) {
    return next(new ErrorResponse(`Category not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!category) {
    return next(new ErrorResponse(`Category not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});