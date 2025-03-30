import { useState } from 'react';
import GetForm from './SignInUpForm';
import './auth.css';

function SignInUp() {
  const [formType, setFormType] = useState('signUpForm');
  let signUpForm = formType === 'signUpForm';
  
  function toSignIn(event) {
    // logic to switch to Sign In form
    event.preventDefault();
    setFormType('signInForm');
  }

  function toSignUp(event) {
    // logic to switch to Sign Up form
    event.preventDefault();
    setFormType('signUpForm');
  }

  return (
    <div className={ signUpForm ? "sign-up-container" : "sign-in-container" }>
      <div className={ signUpForm ? "sign-up" : "sign-in" }>
        <GetForm formName={ formType } />

        { signUpForm ? (
          <div className="change-form">
            Already have an account?&nbsp;
            <a href="#" onClick={ (event) => toSignIn(event) }>Log in</a>
          </div>
        ) : (
          <div className="change-form">
            Don't have an account?&nbsp;
            <a href="#" onClick={ (event) => toSignUp(event) }>Sign Up</a>
          </div>
        ) }
        
      </div>
        
      { signUpForm ? (
        <h1 className="welcome">Welcome to NomNom Safe!</h1>
      ) : <></>
      }
    </div>
  )
}

export default SignInUp;