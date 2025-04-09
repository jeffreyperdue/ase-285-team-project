import '../../css/auth.scss';

function ChangeEmail() {
	return (
		<>
			<div>
				<input
					type='email'
					name='currentEmail'
					placeholder='Current Email*'
					required
					maxLength={50}
					className='current-email'
				/>
			</div>

			<div>
				<input
					type='email'
					name='newEmail'
					placeholder='New Email*'
					required
					maxLength={50}
					className='new-email'
				/>
			</div>
		</>
	);
}

export default ChangeEmail;
