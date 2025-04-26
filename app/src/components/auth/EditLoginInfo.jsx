import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import GetConfirmationMessage from '../ConfirmationMessage';
import getCookie from '../../assets/cookies';
import '../../css/auth.scss';

function EditLoginInfo() {
	const [option, setOption] = useState('');
	const [showConfirmation, setShowConfirmation] =
		useState(false);

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
		var newCred;

		if (option === 'email') {
			newCred = form.newEmail.value;
		} else if (option === 'password') {
			// TODO: add password validation (check newPassword against confirmNewPassword)
			newCred = form.newPassword.value;
		}

		console.log('credType:', option);
		console.log('newCred:', newCred);

		const formData = {
			credType: option,
			email: getCookie('email'),
			newCred: newCred,
		};

		console.log('formData:', formData);

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
				setShowConfirmation(true);
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
			{showConfirmation ? (
				<GetConfirmationMessage
					message='Login information changed successfully.'
					destination='/dashboard'
				/>
			) : (
				<></>
			)}

			<h1>Edit Login Information</h1>

			<div className='edit-login-info-form-container'>
				<form
					name='editLoginInfoForm'
					method='POST'
					onSubmit={save}
					className='edit-login-info-form'
				>
					<div>
						<span className='question'>
							Which would you like to change?
						</span>

						<div>
							<label
								key='email'
								className='radio-label'
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
								className='radio-label'
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
