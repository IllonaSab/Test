// models/menuModel.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    customizations: [{ type: String }]
});

module.exports = mongoose.model('MenuItem', menuItemSchema);