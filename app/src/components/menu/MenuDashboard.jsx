import React, { useState } from 'react';
import MenuCard from './MenuCard';
import '../../css/MenuDashboard.css';
import deleteIcon from '../../icons/delete.png';

function MenuDashboard() {
  // Initial state: Master Menu is always shown first
  const [menus, setMenus] = useState([
    {
      title: 'Master Menu',
      description: 'This menu will be shown to customers',
    },
  ]);

  // Controls whether the confirm delete popup is shown
  const [showConfirm, setShowConfirm] = useState(false);

  // Tracks which menu is selected for deletion
  const [menuToDelete, setMenuToDelete] = useState(null);

  // Adds a new menu card with default name/description
  const handleAddMenu = () => {
    const newMenu = {
      title: 'Untitled Menu',
      description: 'New menu created',
    };
    setMenus([...menus, newMenu]);
  };

  // Triggers the confirm delete popup for the selected index
  const handleRequestDelete = (index) => {
    setMenuToDelete(index);
    setShowConfirm(true);
  };

  // Finalizes deletion of the selected menu
  const handleConfirmDelete = () => {
    setMenus(menus.filter((_, i) => i !== menuToDelete));
    setMenuToDelete(null);
    setShowConfirm(false);
  };

  // Cancels deletion and hides the popup
  const handleCancelDelete = () => {
    setShowConfirm(false);
    setMenuToDelete(null);
  };

  return (
    <div className="dashboard-container">
      {/* Top header with Add button and title */}
      <div className="dashboard-header">
        <button className="button" onClick={handleAddMenu}>+ Add a Menu</button>
        <h2 className="dashboard-title">Your Menu Dashboard</h2>
      </div>

      {/* Display all menu cards */}
      <div className="menu-grid">
        {menus.map((menu, index) => (
          <div className="menu-card-wrapper" key={index}>
            {/* Show delete icon for menus except the first (Master Menu) */}
            {index !== 0 && (
              <img
                src={deleteIcon}
                alt="Delete"
                className="delete-icon"
                onClick={() => handleRequestDelete(index)}
              />
            )}
            <MenuCard
              title={menu.title}
              description={menu.description}
              buttonLabel="View Menu"
            />
          </div>
        ))}
      </div>

      {/* Conditional rendering of the confirmation box */}
      {showConfirm && (
        <div className="confirm-delete-box">
          <div className="confirm-content">
            <p className="confirm-title">Confirm Deletion?</p>
            <p className="confirm-message">
              You are deleting <strong>{menus[menuToDelete]?.title}</strong>.
            </p>
          </div>
          <div className="delete-buttons-box">
            <button className="delete-cancel" onClick={handleCancelDelete}>
              No, do not Delete
            </button>
            <button className="delete-confirm" onClick={handleConfirmDelete}>
              Yes, Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuDashboard;
