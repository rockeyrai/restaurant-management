const mongoose = require('mongoose');

// Session Schema for MongoDB
const sessionSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },  // Use Number to store the MySQL user ID
  session_id: { type: String, required: true, unique: true },  // Ensure session_id is unique
  expires_at: { type: Date, required: true },
}, { timestamps: true });  // Add createdAt and updatedAt automatically

// Create Session model
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;

