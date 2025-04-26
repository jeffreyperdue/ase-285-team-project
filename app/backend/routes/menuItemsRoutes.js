const express = require('express');
const router = express.Router();
const MenuItem = require('../schemas/MenuItem');
const Menu = require('.../schemas/Menu')
const mongoose = require('mongoose');
// const { Menu } = require('@mui/material');

// MenuItems.jsx
// @route   GET /api/menuitems
// @desc    Get all menu items
// @access  Public (no auth yet)
router.get('/menuitems', async (req, res) => {
    try {
      let menuitems = await MenuItem.find();
  
      // If there are no menuItiems pulled from mongodb
      if (menuitems.length === 0) {
        // Create Menu Item
        const menuItem = new MenuItem({
          title: 'Example Menu Item',
          description: 'This is shown to customers',
          ingredients: 'Cheese, bread, broccoli',
          allergens: ['Dairy, Wheat'],
          menuID: ['680a79fa3b98428dcf348668']
        });
  
        const saved = await menuItem.save();
        menuitems = [saved]; // start list with Master Menu
      } else {
       // DO SOMETHING if not saved because oops.
      }
  
      res.json(menuitems || []);
    } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Could not fetch menu items' });
  }
  });
  
// @route   PUT /api/menuitems
// @desc    Edit an existing menu item
// @access  Public (no auth yet)
router.put('/menuitems', async (req, res) => {
  try {
    const { name, description, ingredients, allergens } = req.body;

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Menu item ID is required' });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      // updated fields
      { name, description, ingredients, allergens, menuIDs },
       // Return the updated document and validate the data
      { new: true, runValidators: true}
    );

    // If no menu item is found, return an error
    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ error: 'Error editing menu item: ' + err.message });
  }
});

///
/// AddMenuItem.jsx
///

// @route   GET /api/addmenuitem
// @desc    Get all menu items
// @access  Public (no auth yet)
router.get('/addmenuitem', async (req, res) => {
  try {
    let menuitems = await MenuItem.find();

    // If there are no menuItiems pulled from mongodb
    if (menuitems.length === 0) {
      // Create Menu Item
      const menuItem = new MenuItem({
        title: 'Example Menu Item',
        description: 'This is shown to customers',
        ingredients: 'Cheese, bread, broccoli',
        allergens: ['Dairy, Wheat'],
        menuIDs: ['680a79fa3b98428dcf348668']
      });

      const saved = await menuItem.save();
      menuitems = [saved]; // start list with Master Menu
    } else {
     // DO SOMETHING if not saved because oops.
    }

    res.json(menuitems || []);
  } catch (err) {
  console.error('Error fetching menu items:', err);
  res.status(500).json({ error: 'Could not fetch menu items' });
}
});

// @route   POST /api/menuitems
// @desc    Create a new menu item
// @access  Public (no auth yet)
router.post('/addmenuitem', async (req, res) => {
  try {
    const { name, description, ingredients, allergens, menuIDs } = req.body;

    // Create new menu document from request body
    const newMenuItem = new MenuItem({
      name,
      description,
      ingredients,
      allergens,
      menuIDs
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (err) {
    res.status(400).json({ error: 'Error creating menu: ' + err.message });
  }
});

///
/// MenuItemPicklist.jsx
///
// MenuItemPicklist.jsx
// @route   GET /api/swap-menu
// @desc    Get all menu items
// @access  Public (no auth yet)
router.get('/swap-menu', async (req, res) => {
  try {
    let menuitems = await MenuItem.find();

    // If no menu items exist, create a default one
    if (menuitems.length === 0) {
      const menuItem = new MenuItem({
        name: 'Example Menu Item',
        description: 'This is shown to customers',
        ingredients: 'Cheese, bread, broccoli',
        allergens: ['Dairy', 'Wheat'],
        menuIDs: ['680a79fa3b98428dcf348668']
      });

      const saved = await menuItem.save();
      menuitems = [saved];
    }

    res.json(menuitems || []);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Could not fetch menu items' });
  }
});


// @route   PUT /api/swap-menu
// @desc    Edit an existing menu item
// @access  Public (no auth yet)
router.put('/swap-menu', async (req, res) => {
  try {
    const { name, description, ingredients, allergens, menuIDs } = req.body;

    // Ensure the ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Menu item ID is required' });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      // updated fields
      { name, description, ingredients, allergens, menuIDs },
       // Return the updated document and validate the data
      { new: true, runValidators: true}
    );

    // If no menu item is found, return an error
    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ error: 'Error editing menu item: ' + err.message });
  }
});


module.exports = router;
