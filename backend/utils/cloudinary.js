const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spiritual-gurus',
    allowed_formats: process.env.IMAGE_FORMATS.split(','),
    transformation: [
      { width: 800, height: 800, crop: 'limit' }, // Main image
      { width: 300, height: 300, crop: 'pad', background: 'auto:predominant' } // Download version
    ],
    quality: 'auto:good'
  }
});

module.exports = {
  cloudinary,
  storage,
  upload: (file) => cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  })
};