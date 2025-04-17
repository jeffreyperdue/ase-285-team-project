const express = require('express');
const router = express.Router();
const Menu = require('../schemas/Menu');
const mongoose = require('mongoose');

// @route   GET /api/menus
// @desc    Get all menus
// @access  Public (no auth yet)
router.get('/', async (req, res) => {
    try {
      let menus = await Menu.find();
  
      if (menus.length === 0) {
        // Create Master Menu
        const masterMenu = new Menu({
          title: 'Master Menu',
          description: 'This menu will be shown to customers',
          restaurant: new mongoose.Types.ObjectId(), // replace later with real one
          menuItems: []
        });
  
        const saved = await masterMenu.save();
        menus = [saved]; // start list with Master Menu
      } else {
        // Always ensure Master Menu is first
        menus.sort((a, b) => {
          if (a.title === 'Master Menu') return -1;
          if (b.title === 'Master Menu') return 1;
          return 0;
        });
      }
  
      res.json(menus);
    } catch (err) {
      res.status(500).json({ error: 'Could not fetch menus' });
    }
  });
  
  

// @route   POST /api/menus
// @desc    Create a new menu
// @access  Public (no auth yet)
router.post('/', async (req, res) => {
  try {
    const { title, description, restaurant, menuItems } = req.body;

    // Create new menu document from request body
    const newMenu = new Menu({
      title,
      description,
      restaurant,
      menuItems
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ error: 'Error creating menu: ' + err.message });
  }
});

module.exports = router;
