import mongoose from 'mongoose';
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  ingredients: [String],
  description: String,
  allergens: [String]
});

const MenuItem = mongoose.model('MenuItem, menuItemSchema');

module.exports = { MenuItem };