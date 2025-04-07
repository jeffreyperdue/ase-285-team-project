import React, { useState } from 'react';
import avatar from '../icons/avatar.png';
import editLoginIcon from '../icons/edit_login.png';
import editBusinessIcon from '../icons/edit_business.png';
import logoutIcon from '../icons/logout.png';
import '../css/ProfileIcon.css';

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="profile-icon-container">
      <img
        src={avatar}
        alt="User Profile"
        className="avatar-icon"
        onClick={toggleDropdown}
      />

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <img src={editLoginIcon} alt="Edit Login" />
            <span>Edit Login Info</span>
          </div>
          <div className="dropdown-item">
            <img src={editBusinessIcon} alt="Edit Business" />
            <span>Edit Business Info</span>
          </div>
          <div className="dropdown-item">
            <img src={logoutIcon} alt="Logout" />
            <span>Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
}
