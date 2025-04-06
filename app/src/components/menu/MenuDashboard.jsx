import React from 'react';
import MenuCard from './MenuCard';
import '../../css/MenuDashboard.css';

const dummyMenus = [
  {
    title: 'Master Menu',
    description: 'This menu will be shown to customers',
  },
];

function MenuDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
      <button className="button">+ Add a Menu</button>
        <h2 className="dashboard-title">Your Menu Dashboard</h2>
      </div>

      <div className="menu-grid">
        {dummyMenus.map((menu, index) => (
          <MenuCard
            key={index}
            title={menu.title}
            description={menu.description}
            buttonLabel="View Menu"
          />
        ))}
      </div>
    </div>
  );
}

export default MenuDashboard;
