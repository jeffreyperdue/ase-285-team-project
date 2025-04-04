import { useNavigate } from 'react-router-dom';
import '../../css/auth.css';
import GeneratePasswordField from './Password';
import PropTypes from 'prop-types';

function GetForm({ formName }) {
  const navigate = useNavigate();

  const signUp = (event) => {
    event.preventDefault();
    navigate('/setUp1');
  }

  const logIn = (event) => {
    event.preventDefault();
    navigate('/logIn');
  }

  const continueSetUp = (event) => {
    event.preventDefault();
    navigate('/setUp2');
  }

  if (formName === 'setUpForm') {
    // TO DO: add back arrow for backwards navigation
    return (
      <form name={ formName } className="set-up-form">
        <h2 className="title">Set Up</h2>

        <input type="text" name="businessName" placeholder="Business Name" required />
        <input type="text" name="website" placeholder="Web Profile URL" />
        <input type="text" name="address" placeholder="Location Address" />
        
        <button type="submit" onClick={ continueSetUp } className="set-up-btn button">Continue</button>
      </form>
    )
  }

  return (
    <form name={ formName } className="auth-form">
      <h2 className="title">NomNom Safe</h2>

      <input type="text" name="email" placeholder="Email" required />
      
      <GeneratePasswordField name="password" placeholder="Password" />

      {/* dynamically generates:
            Confirm Password field and Sign Up button for Sign Up form
            Log In button for Sign In form */}
      { formName === 'signUpForm' ? (
        <>
          <GeneratePasswordField name="confirmPassword" placeholder="Confirm Password" />

          <button type="submit" onClick={ signUp } className="sign-up-btn button">Sign Up</button>
        </>
      ) : (
        <button type="submit" onClick={ logIn } className="sign-in-btn button">Log In</button>
      ) }
    </form>
  )
}

// Prop validation
GetForm.propTypes = {
  formName: PropTypes.string.isRequired,
}

export default GetForm;