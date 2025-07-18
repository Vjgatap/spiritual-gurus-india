const Admin = require('../models/admin.models');
const ErrorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('../middleware/async.middleware');

// @desc    Register admin
// @route   POST /api/v1/auth/admin/register
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if email already exists manually
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return next(new ErrorResponse('Email already exists', 400));
  }

  const admin = await Admin.create({
    name,
    email,
    password
  });

  const token = admin.getJwtToken();

  res.status(201).json({
    success: true,
    token
  });
});

// @desc    Login admin
// @route   POST /api/v1/auth/admin/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = admin.getJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});