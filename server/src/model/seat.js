const mongoose = require('mongoose');

const storeAvailabilitySchema = new mongoose.Schema({
  date_time: { type: Date, required: true },
  total_seats: { type: Number, required: true },
  reserved_seats: { type: Number, required: true },
  available_seats: { type: Number, required: true },
});

const StoreAvailability = mongoose.model('StoreAvailability', storeAvailabilitySchema);

module.exports = StoreAvailability;
