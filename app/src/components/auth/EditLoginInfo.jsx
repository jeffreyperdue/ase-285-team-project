import { useState } from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import GetConfirmationMessage from '../ConfirmationMessage';
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

	const save = (event) => {
		event.preventDefault();
		setConfirmation(true);
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
