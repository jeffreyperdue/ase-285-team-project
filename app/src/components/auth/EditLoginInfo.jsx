import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import GetConfirmationMessage from '../ConfirmationMessage';
import getCookie from '../../assets/cookies';
import '../../css/auth.scss';

function EditLoginInfo() {
	const [option, setOption] = useState('');
	const [confirmation, setConfirmation] = useState(false);

	const getEditLoginForm = (option) => {
		switch (option) {
			case 'email':
				return <ChangeEmail />;
			case 'password':
				return <ChangePassword />;
			default:
				return <></>;
		}
	};

	const save = async (event) => {
		event.preventDefault();
		const form = event.target;
		const newCred = (option) => {
			switch (option) {
				case 'email':
					return form.newEmail.value;
				case 'password':
					return form.newPassword.value;
				default:
					return null;
			}
		};
		const formData = {
			credType: option,
			email: getCookie('email'),
			newCred: newCred,
		};

		try {
			const response = await fetch(
				'http://localhost:5000/api/auth/edit-login',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const result = await response.json();
				console.log(result.email);
				setConfirmation(true);
			} else {
				console.log(response.body);
				const error = await response;
				console.error('Error:', error);
			}
		} catch (err) {
			console.error('Error: ', err.message);
		}
	};

	return (
		<div className='edit-login-info-page-container'>
			{confirmation ? (
				<GetConfirmationMessage type='edit-login-info' />
			) : (
				<></>
			)}

			<h1>Edit Login Information</h1>

			<div className='edit-login-info-form-container'>
				<form
					name='editLoginInfoForm'
					className='edit-login-info-form'
				>
					<div>
						<span className='question'>
							Which would you like to change?
						</span>

						<div>
							<label
								key='email'
								className='edit-login-info-label'
							>
								<input
									type='radio'
									name='editLoginInfo'
									value='email'
									onChange={() => setOption('email')}
								/>
								Email
							</label>

							<label
								key='password'
								className='edit-login-info-label'
							>
								<input
									type='radio'
									name='editLoginInfo'
									value='password'
									onChange={() => setOption('password')}
								/>
								Password
							</label>
						</div>
					</div>

					<div className='edit-login-info-container'>
						{getEditLoginForm(option)}

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

export default EditLoginInfo;
