import { useState } from 'react';
import '../../css/styles.css';
import AllergenList from '../auth/AllergenList';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

// Collapsible Panel Component
const CollapsiblePanel = ({ header, onSave, onAddPanel }) => {
  // State for expanding/collapsing the panel
  const [isOpen, setIsOpen] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    description: ''
  });

  // State for selected allergen IDs
  const [selectedIds, setSelectedIds] = useState([]);

  // Toggle the collapsible panel open/closed
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Update formData when inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save button handler: send form data (including allergens) to parent
  const handleSave = () => {
    onSave({ ...formData, allergens: selectedIds });
  };

  // Checkbox handler for allergen selections
  const handleCheckboxChange = (event) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setSelectedIds([...selectedIds, checkedId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== checkedId));
    }
  };

  // Optional: List of common allergens for testing/demo purposes
  const [allergens] = useState([
    { allergenID: "1", name: "Peanut" },
    { allergenID: "2", name: "Gluten" },
    { allergenID: "3", name: "Eggs" },
    { allergenID: "4", name: "Dairy" },
  ]);

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
