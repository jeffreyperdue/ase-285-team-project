import { useState, changeState } from 'react';
import '../../css/styles.css'
import Checkbox from './assets/Checkbox.jsx';

const AddMenuItemForm = () => {
    const [inputs, setInputs] = useState({
        itemName: '',
        ingredients: '',
        description: ''
    });
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
        <div className="flex-container">
            <form>
                <div className="left-side">
                    <div name="nameInput">
                        <h3 className="title">Name:</h3>
                        <input type="text" id="itemName" 
                        name="itemName"
                        style={{ width: '100%' }} />
                    </div>
                    <div name="ingredientsInput">
                        <h3 className="title">Ingredients</h3>
                        <textarea id="ingredients" name="ingredients" rows="4" cols="50">List Ingredients Here</textarea>
                    </div>
                    <div className="descriptionInput">
                        <h3 className="title">Description</h3>
                        <textarea id="description" name="description" rows="4" cols="50">   </textarea>
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
                <div>
                    <button className="button">Save</button>
                </div>
            </form>
            
        <button className="button">+ Add Another</button>
        </div>
    )
}

export default AddMenuItemForm;