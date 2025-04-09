import { useState, changeState } from 'react';
import '../../css/styles.css'
//import Checkbox from './assets/Checkbox.jsx';
import AllergenList from '../auth/AllergenList';

const AddMenuItemForm = () => {
    const [inputs, setInputs] = useState({});
    const [selectedIds, setSelectedIds] = useState({});
    const selectedAllergens = [];

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if (event.target.selected){
            setSelectedIds([...selectedIds, checkedId]);
            selectedAllergens.push(selectedIds);
            console.log(selectedAllergens);
        }else{
            setSelectedIds(selectedIds.filter(id=>id !== checkedId))
        }
    }

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
                        {selectedAllergens.length > 0 ? (
                            selectedAllergens.join(', ')
                        ) : (
                            <p>No allergens selected</p>
                        )}
                    </div>
                    <div className="allergen-add">
                        <AllergenList 
                            selectedAllergens={selectedAllergens}
                        />
                    </div>
                </div>
                <button>+ Add Another</button>
                <button>Save</button>
            </form>
        </div>
    )
}

export default AddMenuItemForm;