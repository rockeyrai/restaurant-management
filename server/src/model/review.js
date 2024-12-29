const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: Number, required: true }, // Reference to MySQL user ID
  menu_item_id: { type: Number, required: true }, // Reference to menu item ID
  rating: { type: Number, required: true, min: 1, max: 5 }, // 1 to 5 stars
  comment: { type: String }, // Optional comment
  created_at: { type: Date, default: Date.now }, // Timestamp
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
