import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/auth.scss';
import GetPasswordField from './Password';

function GetAuthForm({ formName }) {
	const navigate = useNavigate();

	const signUp = (event) => {
		event.preventDefault();
		navigate('/step1');
	};

	const logIn = (event) => {
		event.preventDefault();
		navigate('/dashboard');
	};

	return (
		<form
			name={formName}
			className='auth-form'
		>
			<h2
				className={
					formName === 'signUpForm'
						? ' sign-up-title'
						: 'login-title'
				}
			>
				NomNom Safe
			</h2>

			{formName === 'signUpForm' ? (
				<>
					<div className='form-field-container'>
						<label for='fname'>
							First Name <span className='required'>*</span>
						</label>

						<input
							type='text'
							name='fname'
							placeholder='First Name'
							required
							className='name'
						/>
					</div>

					<div className='form-field-container'>
						<label for='lname'>
							Last Name <span className='required'>*</span>
						</label>

						<input
							type='text'
							name='lname'
							placeholder='Last Name'
							required
							className='name'
						/>
					</div>
				</>
			) : (
				<></>
			)}

			<div className='form-field-container'>
				<label for='email'>
					Email <span className='required'>*</span>
				</label>

				<input
					type='text'
					name='email'
					placeholder='johndoe@mail.com'
					required
					className='email'
				/>
			</div>

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
