const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  menu_item_id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  updated_at: { type: Date, default: Date.now },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
