import '../../css/styles.css';
import PropTypes from 'prop-types';

function AddMenuItemForm() {
    const [inputs, setInputs, selectedIds, setSelectedIds] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if (event.target.selected){
            setSelectedId([...selectedIds, checkedId])
        }else{
            setSelectedId(selectedIds.filter(id=>id !== checkedId))
        }
    }
    // For testing the dynamically created check list.
    const allergens = [
        { allergenID: "1", name:"Peanut"},
        { allergenID: "2", name:"Gluten"},
        { allergenID: "3", name: "Eggs"},
        { allergenID: "4", name: "Dairy"},
    ]

    const checkboxList = {allergens}.map((allergen, index) => (
        <label key={allergen.allergenId}>
            <input type="checkbox" value={item.allergenId} 
            checked={selectedIds.includes(item.roleId)}
            onChange={(event) => {handleCheckboxChange(event) }}
            />
            {item}
        </label>
    ))

    return (
        <form name="addMenuItem" onSubmit={handleSubmit}>
            <div>
                <div className="left-side">
                    <div name="nameInput">
                        <h2 className="title">Name:</h2>

                        <input type="text" id="itemName" 
                        name="itemName" value="Type name here"
                        onChange={handleChange}/>
                    </div>
                    <div name="ingredientsInput">
                        <h2 className="title">Ingredients</h2>
                        <textarea id="ingredients" name="ingredients" rows="4" cols="50">List Ingredients Here</textarea>
                    </div>
                    <div name="descriptionInput">
                        <h2 className="title">Description</h2>
                        <textarea id="description" name="description" rows="4" cols="50">Type Description Here</textarea>
                    </div>
                </div>
                <div className="right-side">
                    <h2>This Item Contains the Following Allergens:</h2>
                    <div name="displayAllergens"></div>
                    <div name="allergenAdd">
                        <h2>Most Common Allergens</h2>
                        <div>{checkboxList}</div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </form>
    )
}


export default AddMenuItemForm;

