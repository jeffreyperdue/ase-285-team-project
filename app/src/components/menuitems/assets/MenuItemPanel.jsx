import React, {useState } from 'react';
import { FaPencilAlt, FaTrash, FaSave } from 'react-icons/fa';
import axios from 'axios';
import '../../../css/styles.css'

const MenuItemPanel = ({ item, onSave, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...item });

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleRequestDelete = (itemId) => {
    setMenuItemToDelete(itemId);
    setShowConfirm(true);
  };  

  const handleConfirmDelete = async () => {
    if (!menuItemToDelete) {
      console.error('Menu Item ID missing — cannot delete');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5000/menuitems/${menuItemToDelete}`); // Correct route
  
      if (onDelete) {
        onDelete(menuItemToDelete);
      }
  
      setMenuItemToDelete(null);
      setShowConfirm(false);
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  const handleCancelDelete = () => {
      setShowConfirm(false);
      setMenuItemToDelete(null);
  };

  
  return (
    <div className="menu-item-panel collapsible-panel">
      <div className="panel-header" onClick={toggleOpen}>
        <span>{item.name}</span>
        <div className="panel-actions">
          <FaPencilAlt className="fa-pencil-alt" 
            size={18} 
            onClick={(e) => { 
              e.stopPropagation();
            toggleEdit(); 
            }} 
           />
          <FaTrash
            size={18}
            onClick={(e) => { 
              e.stopPropagation(); 
              handleRequestDelete(item._id); 
            }}
          />
        </div>
      </div>

      {isOpen && (
        <div className="panel-body add-center-flex">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Ingredients"
              />
              <textarea
                name="allergens"
                value={formData.allergens.join(', ')}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    allergens: e.target.value.split(',').map(a => a.trim()),
                  }))
                }
                placeholder="List allergens separated by commas"
              />
              <button className="button" onClick={handleSave}>
                <FaSave size={16}
                onClick={handleSave} /> Save
              </button>
            </>
          ) : (
            <>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <pre>{item.ingredients}</pre>
              <h4>Allergens:</h4>
              {item.allergens && item.allergens.length > 0 ? (
                <ul>
                  {item.allergens.map((allergen, index) => (
                    <li key={index}>{allergen}</li>
                  ))}
                </ul>
              ) : (
                <p>No allergens listed</p>
              )}
            </>
          )}
        </div>
      )}

      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this item?</p>
          <button className="button" onClick={handleConfirmDelete}>Yes, Delete</button>
          <button className="button" onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};
  
  export default MenuItemPanel;