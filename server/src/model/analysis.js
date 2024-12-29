const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  metric_type: { type: String, required: true }, // e.g., 'orders', 'revenue', 'menu_popularity'
  metric_value: { type: Number, required: true }, // e.g., 120 (number of orders)
  date: { type: Date, required: true }, // Date for the metric
  additional_data: { type: mongoose.Schema.Types.Mixed }, // Flexible field for extra data
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
