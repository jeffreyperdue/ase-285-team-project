import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItemPanel from './assets/MenuItemPanel.jsx';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../assets/cookies';
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

 // fetch menuItems on initial renders
 const fetchMenuItems = async () => {
  try {
    // const menuID = "680a79fa3b98428dcf348668";
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
  fetchMenuItems();
}, []);

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

  const location = useLocation();
  const menuTitle = location.state?.menuTitle || 'Untitled Menu';

  const navigate = useNavigate();
  const isAuthorized = getCookie('isAuthorized');

  const toAddItem = (event) => {
    event.preventDefault();
    if (isAuthorized === 'true') {
      navigate('/add-menu-item');
    } else {
      navigate('/');
    }
  };

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
        <button className="button">Integrate Menus</button>
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
