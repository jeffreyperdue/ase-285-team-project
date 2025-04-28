const connectDB = require('./config/db');
const Menu = require('./schemas/Menu');

const mongoose = require('mongoose');

// Load env variables
require('dotenv').config();

const runTest = async () => {
  try {
    await connectDB();

    // Create a dummy menu
    const testMenu = new Menu({
      title: 'Test Menu',
      description: 'Temporary test menu',
      restaurant: new mongoose.Types.ObjectId(), // just a placeholder ID
      menuItems: []
    });

    const savedMenu = await testMenu.save();
    console.log('Test menu saved successfully:', savedMenu);

    // Exit cleanly
    mongoose.connection.close();
  } catch (err) {
    console.error('Test failed:', err.message);
    mongoose.connection.close();
  }
};

runTest();
