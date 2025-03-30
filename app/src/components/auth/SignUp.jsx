import './signup.css';

function SignUp() {
  return (
    <div className="sign-up-container">
      <div className="sign-up">
        <form name="signUpForm" className="sign-up-form">
          <h2 className="title">NomNom Safe</h2>
          <input type="text" name="email" placeholder="Email" required />
          
          <input type="text" name="password" placeholder="Password" required />

          <input type="text" name="confirmPassword" placeholder="Confirm Password" required />
          
          <button type="submit" className="sign-up-btn button">Sign Up</button>
        </form>

        <div className="to-sign-in">Already have an account? <a href="#">Log in</a></div>
      </div>
      
      <h1 className="welcome">Welcome to NomNom Safe!</h1>
    </div>
  )
}

export default SignUp;