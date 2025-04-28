
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


  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    description: ''
  });

  // State for selected allergen IDs
  const [selectedIds, setSelectedIds] = useState([]);

<<<<<<< HEAD
  // Toggle the collapsible panel open/closed
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
=======
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

  // Optional: List of common allergens for testing/demo purposes
  const [allergens] = useState([
    { allergenID: "1", name: "Peanut" },
    { allergenID: "2", name: "Gluten" },
    { allergenID: "3", name: "Eggs" },
    { allergenID: "4", name: "Dairy" },
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
  // Removes an allergen from the selected list
  const removeAllergen = (id) => {
    setSelectedIds(prev => prev.filter(existingId => existingId !== id));
  };

  return (
    <div className="center">
      <div className="collapsible-panel-add">
        <div className="panel-header" onClick={togglePanel}>
          <span className="angle-icon">
            {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          </span>
          {/* Use the inputted name if available, else fallback to header or default text */}
          {formData.name || header || `New Menu Item`}
        </div>

        {isOpen && (
          <div className="panel-body">
            <div className="flex-container">
              <form>
                {/* LEFT COLUMN: Form Inputs */}
                <div className="left-side">
                  <div>
                    <h3>Name:</h3>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <h3>Ingredients</h3>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      rows="4"
                      cols="50"
                    />
                  </div>
                  <div>
                    <h3>Description</h3>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      cols="50"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Allergen Display & Selection */}
                <div className="right-side">
                  <h3>This Item Contains the Following Allergens:</h3>
                  <div className="display-allergens">
                    {selectedIds.length > 0
                      ? selectedIds.join(', ')
                      : <p>No allergens selected</p>}
                  </div>
                  <p>Most Common Allergens</p>
                  <div className="allergen-add">
                    <AllergenList
                      selectedAllergens={selectedIds}
                      onAllergenChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Buttons: Save and Add Another */}
        <div className="panel-footer">
          <button onClick={handleSave} className="button">
            Save
          </button>
          <button onClick={onAddPanel} className="button">
            Add Another Panel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Form Wrapper
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


        {isOpen && (
          <div className="panel-body">
            <div className="flex-container">
              <form>
                {/* LEFT COLUMN: Form Inputs */}
                <div className="left-side">
                  <div>
                    <h3>Name:</h3>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <h3>Ingredients</h3>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      rows="4"
                      cols="50"
                    />
                  </div>
                  <div>
                    <h3>Description</h3>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      cols="50"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Allergen Display & Selection */}
                <div className="right-side">
                  <h3>This Item Contains the Following Allergens:</h3>
                  <div className="display-allergens">
                    {selectedIds.length > 0
                      ? selectedIds.join(', ')
                      : <p>No allergens selected</p>}
                  </div>
                  <p>Most Common Allergens</p>
                  <div className="allergen-add">
                    <AllergenList
                      selectedAllergens={selectedIds}
                      onAllergenChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Buttons: Save and Add Another */}
        <div className="panel-footer">
          <button onClick={handleSave} className="button">
            Save
          </button>
          <button onClick={onAddPanel} className="button">
            Add Another Panel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Form Wrapper
const AddMenuItemForm = () => {
  const [panels, setPanels] = useState([{}]); // Track multiple collapsible panels

  // Callback when a panel is saved
  const handleSave = (data) => {
    console.log('Form data saved:', data);
  };

  // Add another panel dynamically
  const handleAddPanel = () => {
    setPanels([...panels, {}]);
  };

  return (
    <div>
      {panels.map((panel, index) => (
        <CollapsiblePanel
          key={index}
          header={`New Menu Item ${index + 1}`}
          onSave={handleSave}
          onAddPanel={handleAddPanel}
        />
      ))}
    </div>
  );
};

export default AddMenuItemForm;
