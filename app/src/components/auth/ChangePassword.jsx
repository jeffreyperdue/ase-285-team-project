import GeneratePasswordField from './Password';

function ChangePassword() {
	return (
		<>
			<div>
				<GeneratePasswordField
					name='currentPassword'
					placeholder='Current Password*'
				/>
			</div>

			<div>
				<GeneratePasswordField
					name='newPassword'
					placeholder='New Password*'
				/>
			</div>

			<div>
				<GeneratePasswordField
					name='confirmNewPassword'
					placeholder='Confirm New Password*'
				/>
			</div>
		</>
	);
}

export default ChangePassword;
