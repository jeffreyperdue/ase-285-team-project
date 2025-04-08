import { useNavigate } from 'react-router-dom';
import '../../css/auth.scss';
import GetPasswordField from './Password';
import PropTypes from 'prop-types';

function GetAuthForm({ formName }) {
	const navigate = useNavigate();

	const signUp = (event) => {
		event.preventDefault();
		navigate('/step1');
	};

	const logIn = (event) => {
		event.preventDefault();
		navigate('/logIn');
	};

	return (
		<form
			name={formName}
			className='auth-form'
		>
			<h2 className='title'>NomNom Safe</h2>

			<input
				type='text'
				name='email'
				placeholder='Email'
				required
			/>

			<GetPasswordField
				name='password'
				placeholder='Password'
			/>

			{/* dynamically generates:
            Confirm Password field and Sign Up button for Sign Up form
            Log In button for Sign In form */}
			{formName === 'signUpForm' ? (
				<>
					<GetPasswordField
						name='confirmPassword'
						placeholder='Confirm Password'
					/>

					<button
						type='submit'
						onClick={signUp}
						className='sign-up-btn button'
					>
						Sign Up
					</button>
				</>
			) : (
				<button
					type='submit'
					onClick={logIn}
					className='sign-in-btn button'
				>
					Log In
				</button>
			)}
		</form>
	);
}

// Prop validation
GetAuthForm.propTypes = {
	formName: PropTypes.string.isRequired,
};

export default GetAuthForm;
