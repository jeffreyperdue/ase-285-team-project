import '../../css/auth.scss';

function ChangeEmail() {
	return (
		<>
			<div className='form-field-container'>
				<label for='currentEmail'>Current Email</label>

				<input
					type='email'
					name='currentEmail'
					required
					maxLength={50}
					className='current-email'
				/>
			</div>

			<div className='form-field-container'>
				<label for='newEmail'>New Email</label>

				<input
					type='email'
					name='newEmail'
					required
					maxLength={50}
					className='new-email'
				/>
			</div>
		</>
	);
}

export default ChangeEmail;
