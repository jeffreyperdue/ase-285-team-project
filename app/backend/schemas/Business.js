const mongoose = require('mongoose');
const { Schema } = mongoose;

class Business {
  constructor(name, url, address, restaurantId, menus = [], description = '') {
    this.name = name;
    this.url = url;
    this.address = address;
    this.restaurant = restaurantId;
    this.menus = menus;
  }
}

const BusinessSchema = new Schema({
  name: { type: String, required: true },
  url: { type:String },
  address: { type:String, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
});

BusinessSchema.loadClass(Business);

module.exports = mongoose.model('Business', BusinessSchema);