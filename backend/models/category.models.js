const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add category name'],
    unique: true,
    enum: [
      'Vedic Era',
      'Medieval Era', 
      'Modern Era',
      'Contemporary Era'
    ],
    immutable: true // Prevents name changes after creation
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Prevent deletion if gurus exist
CategorySchema.pre('deleteOne', { document: true }, async function(next) {
  const Guru = mongoose.model('Guru');
  const gurusExist = await Guru.exists({ category: this._id });
  
  if (gurusExist) {
    throw new Error('Cannot delete category with associated gurus');
  }
  next();
});

module.exports = mongoose.model('Category', CategorySchema);