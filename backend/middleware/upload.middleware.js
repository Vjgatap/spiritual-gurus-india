const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

// Single file upload
exports.uploadGuruPhoto = upload.single('photo');

// Handle upload errors
exports.handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next(err);
};