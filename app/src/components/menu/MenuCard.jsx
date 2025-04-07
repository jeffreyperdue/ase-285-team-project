import React from 'react';
import '../../css/MenuCard.css';

export default function MenuCard({ title, description, buttonLabel }) {
  return (
    <div className="menu-card">
      <h3 className="menu-title">{title}</h3>
      <p className="menu-description">{description}</p>
      <button className="view-menu-button">{buttonLabel}</button>
    </div>
  );
}
