import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import GetConfirmationMessage from '../ConfirmationMessage';
import ErrorMessage from '../ErrorMessage';
import getCookie from '../../assets/cookies';
import '../../css/auth.scss';

function EditLoginInfo() {
	const [option, setOption] = useState('');
	const [message, setMessage] = useState(
		'Something went wrong'
	);
	const [showError, setShowError] = useState(false);
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
		const email = getCookie('email');
		var newCred;
		var confirmNewCred;
		var currentCred;
		var wrongEmail = false;

		if (option === 'email') {
			newCred = form.newEmail.value;
			confirmNewCred = form.confirmNewEmail.value;
			currentCred = form.currentEmail.value;
			setMessage('Emails do not match.');

			if (email !== currentCred) {
				wrongEmail = true;
				setMessage('Current email is incorrect');
			}
		} else if (option === 'password') {
			newCred = form.newPassword.value;
			confirmNewCred = form.confirmNewPassword.value;
			currentCred = form.currentPassword.value;
			setMessage('Passwords do not match.');
		}

		const match = newCred === confirmNewCred;
		const newMatchesCurrent =
			match && newCred === currentCred;

		if (option === 'email' && newMatchesCurrent) {
			setMessage(
				`New email must be different from current email.`
			);
			setShowError(true);
		} else if (!match || wrongEmail) {
			setShowError(true);
		} else {
			const formData = {
				credType: option,
				currentCred: currentCred,
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

				const result = await response.json();

				if (response.ok) {
					if (result.message) {
						setMessage(result.message);
					}
					if (response.message) {
						setMessage(response.message);
					}
					setShowConfirmation(true);
				} else {
					if (option === 'password' && result.message) {
						setMessage(result.message);
						setShowError(true);
					} else if (newMatchesCurrent) {
						setMessage(
							`New ${option} must be different from current ${option}.`
						);
					} else if (option === 'email' && result.message) {
						setMessage(result.message);
						setShowError(true);
					} else {
						console.error('Error changing login info.');
					}
				}
			} catch (err) {
				console.error('Error: ', err.message);
			}
		}
	};

	return (
		<div className='edit-login-info-page-container'>
			{showConfirmation ? (
				<GetConfirmationMessage
					message={`Login ${option} changed successfully.`}
					destination='/dashboard'
				/>
			) : (
				<></>
			)}

			{showError ? (
				<ErrorMessage
					message={message}
					destination={false}
					onClose={() => setShowError(false)}
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
