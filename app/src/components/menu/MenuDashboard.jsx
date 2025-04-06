import React, { useState } from 'react';
import MenuCard from './MenuCard';
import '../../css/MenuDashboard.css';
import deleteIcon from '../../icons/delete.png'; // Ensure this path is correct

function MenuDashboard() {
  const [menus, setMenus] = useState([
    {
      title: 'Master Menu',
      description: 'This menu will be shown to customers',
    },
  ]);

  const handleAddMenu = () => {
    const newMenu = {
      title: 'Untitled Menu',
      description: 'New menu created',
    };
    setMenus([...menus, newMenu]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button className="button" onClick={handleAddMenu}>+ Add a Menu</button>
        <h2 className="dashboard-title">Your Menu Dashboard</h2>
      </div>

      <div className="menu-grid">
        {menus.map((menu, index) => (
          <div className="menu-card-wrapper" key={index}>
            {index !== 0 && ( // Show trash icon for all menus except index 0 (Master Menu)
              <img src={deleteIcon} alt="Delete" className="delete-icon" />
            )}
            <MenuCard
              title={menu.title}
              description={menu.description}
              buttonLabel="View Menu"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuDashboard;
