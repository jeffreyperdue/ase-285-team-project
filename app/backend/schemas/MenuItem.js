import mongoose from 'mongoose';
const { Schema } = mongoose;

class MenuItem {
  constructor(title, ingredients=[], allergens = [], description = '') {
    this.title = title;
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

module.exports = mongoose.model('Menu', MenuSchema);