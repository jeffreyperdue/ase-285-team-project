import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import '../../css/auth.scss';

function ChangeLoginInfo() {
	const navigate = useNavigate();
	const [option, setOption] = useState('');
	const [confirmation, setConfirmation] = useState(false);

	const getChangeLoginForm = (option) => {
		switch (option) {
			case 'email':
				return <ChangeEmail />;
			case 'password':
				return <ChangePassword />;
			default:
				return <></>;
		}
	};

	const save = (event) => {
		event.preventDefault();
		setConfirmation(true);
	};

	const toDashboard = (event) => {
		event.preventDefault();
		navigate('/dashboard');
	};

	return (
		<div className='change-login-info-page-container'>
			{confirmation ? (
				<div className='confirmation-container'>
					Login information changed successfully.
					<button
						type='button'
						onClick={toDashboard}
						className='button'
					>
						Ok
					</button>
				</div>
			) : (
				<></>
			)}

			<h1>Change Log In Information</h1>

			<div className='change-login-info-form-container'>
				<form
					name='changeLoginInfoForm'
					className='change-login-info-form'
				>
					<div>
						<span className='question'>
							Which would you like to change?
						</span>

						<div>
							<label
								key='email'
								className='change-login-info-label'
							>
								<input
									type='radio'
									name='changeLoginInfo'
									value='email'
									onChange={() => setOption('email')}
								/>
								Email
							</label>

							<label
								key='password'
								className='change-login-info-label'
							>
								<input
									type='radio'
									name='changeLoginInfo'
									value='password'
									onChange={() => setOption('password')}
								/>
								Password
							</label>
						</div>
					</div>

					<div className='change-login-info-container'>
						{getChangeLoginForm(option)}

						{option ? (
							<button
								type='submit'
								onClick={save}
								className='save-btn button'
							>
								Save
							</button>
						) : (
							<></>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default ChangeLoginInfo;
