import '../../css/styles.css';
import { useState, changeState } from 'react';
import './index.css'
import Checkbox from './assets/Checkbox.jsx';

const AddMenuItemForm = () => {
    const [inputs, setInputs] = useState({});
    const [selectedIds, setSelectedIds] = useState({});
    const selectedAllergens = [];

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if (event.target.selected){
            setSelectedId([...selectedIds, checkedId]);
            selectedAllergens.push(selectedIds);
            print(selectedAllergens);
        }else{
            setSelectedId(selectedIds.filter(id=>id !== checkedId))
        }
    }

    // For testing the dynamically created check list.
    const [allergens, setAllergens] = useState([
        { allergenID: "1", name:"Peanut"},
        { allergenID: "2", name:"Gluten"},
        { allergenID: "3", name: "Eggs"},
        { allergenID: "4", name: "Dairy"},
    ]);

    return (
        <div className="flex-container">
            <form>
                <div className="left-side">
                    <div name="nameInput">
                        <h3 className="title">Name:</h3>
                        <input type="text" id="itemName" cols="50"
                        name="itemName"/>
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
                        <p>A problem to communicate.</p>
                    </div>
                    <div className="allergen-add">
                        {allergens.map((allergen) => (
                            <div>
                                <input 
                                type="checkbox"
                                id={allergen.allergenID}
                                className="allergen-checkbox" 
                                key={allergen.allergenID}
                                />
                                <label for={allergen.allergenID}>{ allergen.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddMenuItemForm;