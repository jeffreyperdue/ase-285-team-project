import { useState } from 'react';
import '../../css/styles.css';
import AllergenList from '../auth/AllergenList';

const AddMenuItemForm = () => {
    const [inputs, setInputs] = useState({});
    const [selectedAllergens, setSelectedAllergens] = useState([]);

    const handleAllergenChange = (event, allergenValue) => {
        if (event.target.checked) {
            setSelectedAllergens([...selectedAllergens, allergenValue]);
        } else {
            setSelectedAllergens(selectedAllergens.filter(item => item !== allergenValue));
        }
    };

    // Function to display allergen labels instead of values
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

    return (
        <div className="add-menu-item-container">
            <form className="menu-item-form">
                <div className="form-column left-column">
                    {/* Left side content */}
                    <div className="form-group">
                        <h3 className="title">Name:</h3>
                        <input type="text" id="itemName" name="itemName" className="form-input"/>
                    </div>
                    <div className="form-group">
                        <h3 className="title">Ingredients</h3>
                        <textarea id="ingredients" name="ingredients" rows="4" className="form-textarea"/>
                    </div>
                    <div className="form-group">
                        <h3 className="title">Description</h3>
                        <textarea id="description" name="description" rows="4" className="form-textarea"/>
                    </div>
                </div>
                
                <div className="form-column right-column">
                    {/* Right side content */}
                    <h3 className="title">This Item Contains the Following Allergens:</h3>
                    <div className="allergen-tags-container">
                        {selectedAllergens.length > 0 ? getAllergenLabels() : (
                            <p className="no-allergens-message">No allergens selected</p>
                        )}
                    </div>
                    <div className="allergen-selection">
                        <AllergenList 
                            selectedAllergens={selectedAllergens}
                            onAllergenChange={handleAllergenChange}
                        />
                    </div>
                </div>
                
                <div className="form-actions">
                    <button type="button" className="button">+ Add Another</button>
                    <button type="submit" className="button">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddMenuItemForm;