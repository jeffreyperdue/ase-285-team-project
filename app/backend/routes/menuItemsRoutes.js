const express = require('express');
const router = express.Router();
const Menu = require('../schemas/MenuItem');
const mongoose = require('mongoose');

// @route   GET /api/menus
// @desc    Get all menus
// @access  Public (no auth yet)
router.get('/addmenuitem', async (req, res) => {
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
router.post('/addmenuitem', async (req, res) => {
  try {
    const { name, description, ingredients, allergens } = req.body;

    // Create new menu document from request body
    const newMenuItem = new MenuItem({
      name,
      description,
      ingredients,
      allergens
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ error: 'Error creating menu: ' + err.message });
  }
});

module.exports = router;
