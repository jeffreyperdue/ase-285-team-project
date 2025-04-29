import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItemPanel from './assets/MenuItemPanel.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/styles.css';

const mockMenuItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Classic burger with cheese and pickles.',
    ingredients: 'Beef, Cheese, Bun, Pickles, Onion, Tomato',
    allergens: []
  },
  {
    id: 2,
    name: 'Vegan Wrap',
    description: 'Fresh and healthy wrap with veggies.',
    ingredients: 'Lettuce, Tomato, Cucumber, Hummus, Wrap',
    allergens: []
  },
];

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const businessId = localStorage.getItem('business_id');
  const location = useLocation();
  const menuTitle = location.state?.menuTitle || 'Untitled Menu';

 // fetch menuItems on initial renders
 const fetchMenuItems = async () => {
  try {
    const menuID = JSON.parse(localStorage.getItem('menu_ID')); // Get from localStorage
    if (!menuID) {
      console.warn('No menu ID found');
      alert("No menu ID found!")
    }

    const res = await axios.get(`http://localhost:5000/api/menuitems?menuID=${menuID}`);
    const fetchedMenuItems = res.data.map(menuItem => ({
      ...menuItem,
    }));
    setMenuItems(fetchedMenuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
  }
  };

 useEffect(() => {
  const params = new URLSearchParams(location.search);
  let menuID = params.get('menuID');

  if (menuID) {
    // Save to localStorage if found in URL
    localStorage.setItem('menu_ID', JSON.stringify(menuID));
  } else {
    // Otherwise try to pull from localStorage
    const storedID = localStorage.getItem('menu_ID');
    if (storedID) {
      menuID = JSON.parse(storedID);
      console.log('Using stored menuID:', menuID);
    } else {
      console.warn('No menuID found in URL or localStorage.');
    }
  }
  fetchMenuItems();
}, [location.search]);

  const handleSave = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/api/menuitems/${updatedItem._id}`, updatedItem);
      alert('Menu item updated successfully!');
      fetchMenuItems();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to update item.');
    }
  };

  const handleDelete = (deletedId) => {
    fetchMenuItems();
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const navigate = useNavigate();
  const toAddItem = (event) => {
    event.preventDefault();
    navigate('/add-menu-item');
  };

  const toMenuSwap = (event) => {
    event.preventDefault();
    navigate('/swap-menu');
  }


return (
    <div className='center'>
      <div className="menu-items-container">
        {/* Top section: buttons + menu name */}
        <div className="menu-header-row">
      <div style={{ flex: 1 }}>
        <button className="button" onClick={toAddItem}>+ Add Item</button>
      </div>
      <div className="menu-name" style={{ flex: 1, textAlign: 'center' }}>{menuTitle}</div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <button className="button" onClick={toMenuSwap}>Integrate Menus</button>
      </div>
    </div>

        {/* Search bar */}
        <div className="menu-search-wrapper">
          <input
            className="menu-search"
            type="text"
            placeholder="Search for Item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Menu items list */}
        <div className="menu-item-list">
          <h2>Menu Items</h2>
          {filteredItems.map((item) => (
            <MenuItemPanel
              key={item._id}
              item={item}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;
