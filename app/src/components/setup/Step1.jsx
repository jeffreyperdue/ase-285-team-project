import '../../css/setup.css';
import { useNavigate } from 'react-router-dom';

function Step1() {
  const navigate = useNavigate();

  const continueSetUp = (event) => {
    event.preventDefault();
    navigate('/step2');
  }

  return (
    <>
      <div className="set-up-form-container">
        <form name="setUpForm" className="set-up-form">
          <h2 className="title">Set Up</h2>

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            required
          />

          <input
            type="text"
            name="website"
            placeholder="Web Profile URL"
          />

          <input
            type="text"
            name="address"
            placeholder="Location Address"
          />
          
          <button
            type="submit"
            onClick={ continueSetUp }
            className="set-up-btn button"
          >
            Continue
          </button>
        </form>
      </div>

      <div className="considerations">
        <h1>Some Important Considerations:</h1>

        <ul>
          <li>Information given in this section will be shown publicly to the users (your customers). Please only give info you want them to see.</li>
          <br />
          <li>If you are a mobile food truck service, please put your most recent or upcoming location, or the location of an event, in the “Location Address” box. This location can be changed at anytime via the “business info” settings.</li>
          <br />
          <li>Additional locations can be added later in the business info settings.</li>
        </ul>
      </div>
    </>
  )
}

export default Step1;