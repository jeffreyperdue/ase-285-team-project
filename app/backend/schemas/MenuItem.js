const mongoose = require('mongoose');
const { Schema } = mongoose;

class MenuItem {
  constructor(name, ingredients=[], allergens = [], description = '') {
    this.name = title;
    this.ingredients = ingredients;
    this.description = description;
    this.allergens = allergens;
  }
}

const MenuItemSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  ingredients: [String],
  description: String,
  allergens: [String]
});

MenuItemSchema.loadClass(MenuItem);

module.exports = mongoose.model('MenuItem', MenuItemSchema);