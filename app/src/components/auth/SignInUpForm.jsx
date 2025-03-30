import './auth.css';
import GeneratePasswordField from './Password';
import PropTypes from 'prop-types';

function GetForm({ formName }) {
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

          <button type="submit" className="sign-up-btn button">Sign Up</button>
        </>
      ) : (
        <button type="submit" className="sign-in-btn button">Log In</button>
      ) }
    </form>
  )
}

// Prop validation
GetForm.propTypes = {
  formName: PropTypes.string.isRequired,
}

export default GetForm;