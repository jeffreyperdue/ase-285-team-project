import '../../css/setup.css';
import GenerateAllergenList from '../auth/AllergenList';
import GenerateDietList from '../auth/DietList';

function Step2() {
  return (
      <div>
        <h1>Your Menu</h1>

        <div className="set-up-menu">
          <div className="allergens">
            <span className="question">
              Do your menu items always contain certain allergens?
            </span>

            <div className="allergen-list">
              <GenerateAllergenList />
            </div>
          </div>

          <div className="diets">
            <span className="question">
              Do you use any special preparation techniques or provide menu items for any diets?
            </span>

            <div className="diet-list">
              <GenerateDietList />
            </div>

            <span>
              For your customers' peace of mind, please upload a certificate of proof (if applicable):
            </span>

            <div className="file-input-container">
              <span className="file-input-label">
                Drag file to upload
              </span>
              
              <input
                type="file"
                className="file-input"
                accept=".pdf,.jpg,.png"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Step2;