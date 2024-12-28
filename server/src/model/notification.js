const mongoose = require('mongoose');

// Notification Schema for MongoDB
const notificationSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },  // Use Number to store the MySQL user ID
  message: { type: String, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },  // Valid statuses
}, { timestamps: true });  // Adds createdAt and updatedAt automatically

// Create Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
