import React, {useState } from 'react';
import { FaPencilAlt, FaTrash, FaSave } from 'react-icons/fa';
import '../../../css/styles.css'

const MenuItemPanel = ({ item, onSave, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...item });
  
    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleEdit = () => setIsEditing(true);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = () => {
      onSave(formData);
      setIsEditing(false);
    };
  
    return (
      <div className="menu-item-panel collapsible-panel">
        <div className="panel-header" onClick={toggleOpen}>
          <span>{item.name}</span>
          <div className="panel-actions">
            <FaPencilAlt className="fa-pencil-alt" size={18} onClick={(e) => { e.stopPropagation(); toggleEdit(); }} />
            <FaTrash className="fa-trash" size={18} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} />
          </div>
        </div>
  
        {isOpen && (
          <div className="panel-body">
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
                <button className="button" onClick={handleSave}>
                  <FaSave size={16} /> Save
                </button>
              </>
            ) : (
              <>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <pre>{item.ingredients}</pre>
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default MenuItemPanel;