const mongoose = require('mongoose');
const { Schema } = mongoose;

class Menu {
  constructor(title, restaurantId, menuItems = [], description = '') {
    this.title = title;
    this.restaurant = restaurantId;
    this.menuItems = menuItems;
    this.description = description;
  }
}

const MenuSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Business', required: true }, 
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

MenuSchema.loadClass(Menu);

module.exports = mongoose.model('Menu', MenuSchema);
