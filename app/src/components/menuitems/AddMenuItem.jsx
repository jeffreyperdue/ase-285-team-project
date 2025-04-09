import { useState, changeState } from 'react';
import '../../css/styles.css'
import Checkbox from './assets/Checkbox.jsx';

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
  
    const handleSave = () => {
      onSave(formData);
    };

    const [selectedIds, setSelectedIds] = useState([]);

    // Handling CheckboxChagnes
    const handleCheckboxChange = (event) => {
        const id = event.target.value;
        if (event.target.checked) {
          setSelectedIds(prev => [...prev, id]);
        } else {
          setSelectedIds(prev => prev.filter(existingId => existingId !== id));
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
      <div className="collapsible-panel">
        <div className="panel-header" onClick={togglePanel}>
          {header}
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
                            rows="4" cols="50">List Ingredients Here</textarea>
                        </div>
                        <div className="descriptionInput">
                            <h3>Description</h3>
                            <textarea id="description" name="description" 
                            value={formData.description}
                            onChange={handleInputChange} 
                            rows="4" cols="50">Enter Description</textarea>
                        </div>
                    </div>
                    <div className="right-side">
                        <h3>This Item Contains the Following Allergens:</h3>
                        <div className="display-allergens">
                        {selectedIds.map(id => {
                            const allergen = allergens.find(a => a.allergenID === id);
                            return (
                            <div key={id} className="tag">
                                <p>{allergen?.name}</p>
                                <p>AllergenNameHere</p>
                                <button onClick={() => removeAllergen(id)}>×</button>
                            </div>
                            );
                        })}
                        </div>
                        <p>Most Common Allergens</p>
                        <div className="allergen-add">
                            {allergens.map((allergen) => (
                                <div>
                                    <input 
                                    type="checkbox"
                                    id={allergen.allergenID}
                                    className="allergen-checkbox" 
                                    key={allergen.allergenID}
                                    checked={selectedIds.includes(allergen.allergenID)}
                                    onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={allergen.allergenID}>{ allergen.name}</label>
                                </div>
                            ))}
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
  
    const handleAddPanel = () => {
      setPanels([...panels, {}]); // Adds a new panel to the array
    };

    return (
        <div>
            {/* Render Collapsible Panels */}
            {panels.map((panel, index) => (
                <CollapsiblePanel
                key={index}
                header={`Menu Item ${index + 1}`}
                onSave={handleSave}
                onAddPanel={handleAddPanel}  // Pass the add panel function as a prop
                />
            ))}
        </div>
    )
}

export default AddMenuItemForm;