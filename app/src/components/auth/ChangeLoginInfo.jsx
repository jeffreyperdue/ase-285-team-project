import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

function ChangeLoginInfo() {
	const navigate = useNavigate();
	const [option, setOption] = useState('');

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
		navigate('/changeLogin');
	};

	return (
		<div className='change-login-info-page-container'>
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
