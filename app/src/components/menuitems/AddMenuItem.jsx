import { useState, useEffect } from 'react';
import '../../css/styles.css'
import AllergenList from '../auth/AllergenList';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Collapsible Panel Component
const CollapsiblePanel = ({ header, formData, onFormChange, onAddPanel, masterMenuID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFormChange({ ...formData, [name]: value });
    };
    
    // Save single menuItem
    const handleSave = async () => {
        try {
            const menuID = localStorage.getItem('menu_id');
            const menuIDs = masterMenuID === menuID ? [masterMenuID] : [masterMenuID, menuID];
            const response = await axios.post('http://localhost:5000/api/menuitems/add-menu-item', {
                name: formData.name,
                description: formData.description,
                ingredients: formData.ingredients,
                allergens: formData.selectedAllergens || [],
                menuIDs: menuIDs
          });
          console.log('Saved menu item:', response.data);
          alert('Item saved successfully!');
        } catch (err) {
          console.error('Error saving menu item:', err);
          alert('Failed to save item.');
        }
    };

    const handleAllergenChange = (event) => {
        const allergenValue = event.target.value;

        if (event.target.checked) {
            setSelectedAllergens(prev => [...prev, allergenValue]);
        } else {
            setSelectedAllergens(prev => prev.filter(a => a !== allergenValue));
        }
    };

    const getAllergenLabels = () => {
        const allergenMap = {
            'lactose': 'Lactose (milk)',
            'gluten': 'Gluten',
            'meat': 'Meat',
            'fish': 'Fish',
            'animalProducts': 'Animal Products',
            'eggs': 'Eggs',
            'shellfish': 'Shellfish',
            'treeNuts': 'Tree Nuts',
            'peanuts': 'Peanuts'
        };
        
        return selectedAllergens.map(value => allergenMap[value]).join(', ');
    };

    // Remove function for tags.
    const removeAllergen = (id) => {
        setSelectedAllergens((prev) => prev.filter((existingId) => existingId !== id));
    };

    return (
        <div className="center">
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
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            style={{ width: '100%' }} />
                                    </div>
                                    <div name="ingredientsInput">
                                        <h3>Ingredients</h3>
                                        <textarea id="ingredients" name="ingredients"
                                            value={formData.ingredients}
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
                                    {selectedAllergens.length > 0 ? getAllergenLabels() : (
                            <p className="no-allergens-message">No allergens selected</p>
                        )}
                                    </div>

                                    <p>Most Common Allergens</p>
                                    <div className="allergen-add">
                                        <AllergenList
                                            selectedAllergens={selectedAllergens}
                                            onAllergenChange={handleAllergenChange}
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
        </div>
    );
};

// The main form
const AddMenuItemForm = () => {
    const [masterMenuID, setMasterMenuID] = useState('');
    const [menuID, setMenuID] = useState('');
    const[routeID, setRouteID] = useState('');
    const [panels, setPanels] = useState([
        { name: '', ingredients: '', description: '', selectedAllergens: [], menuIDs: [] }
    ]);

    // Call the functions to pull in the menus and menu items.
    useEffect(() => {
        // Get the MasterMenu ID
        const storedMasterID = localStorage.getItem('masterMenu_ID');
        
        if (storedMasterID) {
            setMasterMenuID(storedMasterID);
        }
        const storedMenuID = localStorage.getItem('menu_id');
        if (storedMenuID) {
            setMenuID(storedMenuID)
        }
        
        const routeMenuID = masterMenuID === menuID ? [masterMenuID] : [masterMenuID, menuID];
        setRouteID(routeMenuID)
    }, []);

    // Save all menuItems
    // must exist out side due to trying to get all of them.
    const handleSaveAll = async () => {
        try {
            const menuIDs = masterMenuID === menuID ? [masterMenuID] : [masterMenuID, menuID];
            const saveRequests = panels.map(panel =>
                axios.post('http://localhost:5000/api/menuitems/add-menu-item', {
                    name: panel.name,
                    description: panel.description,
                    ingredients: panel.ingredients,
                    allergens: panel.selectedAllergens || [],
                    menuIDs: menuIDs
                })
            );
          await Promise.all(saveRequests);
      
          alert('All items saved successfully!');
        } catch (err) {
          console.error('Error saving items:', err);
          alert('Failed to save all items.');
        }
    };

    const handleAddPanel = () => {
        setPanels([...panels, {}]); // Adds a new panel to the array
    };

    const handlePanelChange = (index, newFormData) => {
        setPanels(prevPanels =>
          prevPanels.map((panel, i) => i === index ? newFormData : panel)
        );
      };

    // For buttons
    const navigate = useNavigate();
    const toMenu = (event) => {
        event.preventDefault();
        navigate(`/menuitems/${routeID}`);
    };

    return (
        <div>
            <div className="center add-center-flex">
                <div className="add-header-row">
                    <div style={{ flex: 1}}><button className="button" onClick={toMenu}>Return to Menu</button></div>
                    <div className="menu-name" style={{ flex: 1, textAlign: 'center' }}>Add Menu Items</div>
                    <div style={{ flex: 1, textAlign: 'right'}}><button className="button" onClick={handleSaveAll}>Save All</button></div>
                </div>
            </div>
            <div className="center add-center-flex">
                {/* Render Collapsible Panels */}
                {panels.map((panelData, index) => (
                    <CollapsiblePanel
                        key={index}
                        header={`New Menu Item ${index + 1}`}
                        formData={panelData}
                        onFormChange={(newFormData) => handlePanelChange(index, newFormData)}
                        onAddPanel={handleAddPanel}
                        masterMenuID={masterMenuID}
                    />
                    ))}
            </div>
        </div>
    )
}

export default AddMenuItemForm;
