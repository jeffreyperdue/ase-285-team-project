// src/components/ProfileIcon.jsx
import React from 'react';
import avatar from '../icons/avatar.png';
import '../css/ProfileIcon.css';

export default function ProfileIcon() {
  return (
    <div className="profile-icon-container">
      <img src={avatar} alt="User avatar" className="profile-avatar" />
    </div>
  );
}
