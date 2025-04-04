import '../../css/setup.css';
import GetForm from './GetForm';

function SetUp1() {
  return (
    <div className="set-up-container">
      <div className="progress-bar">
        Step 1/3
      </div>

      <div className="page1">
        <div className="set-up-form-container">
          <GetForm formName="setUpForm" />
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
      </div>
    </div>
  )
}

export default SetUp1;