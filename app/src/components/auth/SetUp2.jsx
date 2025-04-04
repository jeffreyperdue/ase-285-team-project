import '../../css/setup.css';
import GetForm from './GetForm';
import GenerateAllergenList from './AllergenList';
import GenerateDietList from './DietList';

function SetUp2() {
  return (
    <div className="set-up-container">
      <div className="progress-bar">
        Step 2/3
      </div>

      <div className="page2">
        <h1>Your Menu</h1>

        <div className="set-up-menu">
          <div className="allergens">
            Do your menu items always contain certain allergens?

            <div className="allergen-list">
              <GenerateAllergenList />
            </div>
          </div>

          <div className="diets">
            Do you follow any diets or special preparations?

            <div className="diet-list">
              <GenerateDietList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetUp2;