import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItemPanel from './assets/MenuItemPanel.jsx';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../assets/cookies';
import '../../css/styles.css';
import { Link } from 'react-router-dom';

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



  useEffect(() => {
    // Fetch from your backend here
    setMenuItems(mockMenuItems);
  }, []);

  const handleSave = (updatedItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    // TODO: Send update to backend
  };

  const handleDelete = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    // TODO: Send delete request to backend
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
              key={item.id}
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
