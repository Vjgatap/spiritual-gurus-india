const Admin = require('../models/admin.models');
const asyncHandler = require('../middleware/async.middleware');

// @desc    Register admin
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const admin = await Admin.create({ username, email, password });
  const token = admin.getJwtToken();

  res.status(201).json({
    success: true,
    token
  });
});

// @desc    Login admin
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  const token = admin.getJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});