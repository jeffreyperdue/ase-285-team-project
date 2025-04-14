import React, { useEffect, useState } from 'react';
import MenuItemPanel from './assets/MenuItemPanel.jsx';
import '../../css/styles.css'

const mockMenuItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Classic burger with cheese and pickles.',
    ingredients: 'Beef, Cheese, Bun, Pickles, Onion, Tomato',
  },
  {
    id: 2,
    name: 'Vegan Wrap',
    description: 'Fresh and healthy wrap with veggies.',
    ingredients: 'Lettuce, Tomato, Cucumber, Hummus, Wrap',
  },
];

const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);

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

  return (
    <div className="center">
      <div style={{ padding: '20px' }}>
        <h2>Menu Items</h2>
        {menuItems.map((item) => (
          <MenuItemPanel
            key={item.id}
            item={item}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItemsPage;
