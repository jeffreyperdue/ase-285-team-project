import { useState, changeState } from 'react';
import AllergenList from '../auth/AllergenList';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../assets/cookies';
import axios from 'axios';
import '../../css/styles.css'

// Collapsible Panel Component
const CollapsiblePanel = ({ header, onSave, onAddPanel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', ingredients: '', description:''});
  
    const togglePanel = () => {
      setIsOpen(!isOpen);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSave = async () => {
      try {
        const response = await axios.post('/api/addmenuitem', {
          name: formData.name,
          description: formData.description,
          ingredients: formData.ingredients,
          allergens: formData.selectedAllergens || [],
          menuIDs: ['680a79fa3b98428dcf348668'] // Assign to Master Menu or wherever you want
        });
        console.log('Saved menu item:', response.data);
        alert('Item saved successfully!');
      } catch (err) {
        console.error('Error saving menu item:', err);
        alert('Failed to save item.');
      }
    };

    const [selectedIds, setSelectedIds] = useState([]);


	  const selectedAllergens = [];

    const handleCheckboxChange = (event) => {
      const checkedId = event.target.value;
      if (event.target.selected) {
        setSelectedIds([...selectedIds, checkedId]);
        selectedAllergens.push(selectedIds);
        console.log(selectedAllergens);
      } else {
        setSelectedIds(
          selectedIds.filter((id) => id !== checkedId)
        );
      }
    };

    // For testing the dynamically created check list.
    const [allergens] = useState([
        { allergenID: "1", name:"Peanut"},
        { allergenID: "2", name:"Gluten"},
        { allergenID: "3", name: "Eggs"},
        { allergenID: "4", name: "Dairy"},
    ]);

    // Remove function for tags.
    const removeAllergen = (id) => {
        setSelectedIds(prev => prev.filter(existingId => existingId !== id));
      };
  
    return (
        <div className="collapsible-panel-add">
          <div className="panel-header" onClick={togglePanel}>
            <span
            className='angle-icon'
            onClick={togglePanel}
            >
            {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          </span>
            {formData.name || header || `New Menu Item`}
          </div>
          {isOpen && (
            <div className="panel-body">
              <div className="flex-container">
                  <form>
                      <div className="left-side">
                          <div name="nameInput">
                              <h3>Name:</h3>
                              <input type="text" id="name" 
                              name="name"
                              value={formData.itemName}
                              onChange={handleInputChange}
                              style={{ width: '100%' }}/>
                          </div>
                          <div name="ingredientsInput">
                              <h3>Ingredients</h3>
                              <textarea id="ingredients" name="ingredients" 
                              value={formData.Ingredients}
                              onChange={handleInputChange}
                              rows="4" cols="50"></textarea>
                          </div>
                          <div className="descriptionInput">
                              <h3>Description</h3>
                              <textarea id="description" name="description" 
                              value={formData.description}
                              onChange={handleInputChange} 
                              rows="4" cols="50"></textarea>
                          </div>
                      </div>
                      <div className="right-side">
                          <h3>This Item Contains the Following Allergens:</h3>
                          <div className="display-allergens">
              {selectedAllergens.length > 0 ? (
                selectedAllergens.join(', ')
              ) : (
                <p>No allergens selected</p>
              )}
            </div>
                          <p>Most Common Allergens</p>
                          <div className="allergen-add">
                              <AllergenList
                    selectedAllergens={selectedAllergens}
                  />
                          </div>
                      </div>
                  </form>
              </div>
            </div>
          )}
          <div className="panel-footer">
            <button onClick={handleSave} className="button">
              Save
            </button>
            <button onClick={onAddPanel} className="button">
              Add Another Panel
            </button>
          </div>
        </div>
    );
};

const AddMenuItemForm = () => {
    const [panels, setPanels] = useState([{}]);

    const handleSave = (data) => {
      console.log('Form data saved:', data);
    };
  
    const handleSaveAll = async () => {
      try {
        const saveRequests = panels.map(panel =>
          axios.post('/api/addmenuitem', {
            name: panel.name,
            description: panel.description,
            ingredients: panel.ingredients,
            allergens: panel.selectedAllergens || [],
            menuIDs: ['680a79fa3b98428dcf348668']
          })
        );
    
        await Promise.all(saveRequests);
    
        console.log('All items saved!');
        alert('All items saved successfully!');
      } catch (err) {
        console.error('Error saving items:', err);
        alert('Failed to save all items.');
      }
    };

    const handleAddPanel = () => {
      setPanels([...panels, {}]); // Adds a new panel to the array
    };

    const navigate = useNavigate();
	  const isAuthorized = getCookie('isAuthorized');

    const toMenu = (event) => {
      event.preventDefault();
      if (isAuthorized === 'true') {
        navigate('/menuitems');
      } else {
        navigate('/');
      }
    };

    return (
      <div>
        <div className='center add-center-flex'>
          <div className='add-header-row'>
            <div style={{ flex: 1 }}>
              <button className="button" onClick={toMenu}>Menu</button>
            </div>
            <div className="menu-name" style={{ flex: 1, textAlign: 'center' }}>Add Menu Items</div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <button className="button" onClick={handleSaveAll}>Save All</button>
            </div>
          </div>
        </div>
            {/* Render Collapsible Panels */}
            <div className='center add-center-flex'>
            {panels.map((panel, index) => (
                <CollapsiblePanel
                key={index}
                header={`New Menu Item ${index + 1}`}
                onSave={handleSave}
                onAddPanel={handleAddPanel}  // Pass the add panel function as a prop
                />
            ))}
            </div>
        
      </div>
    )
}

export default AddMenuItemForm;