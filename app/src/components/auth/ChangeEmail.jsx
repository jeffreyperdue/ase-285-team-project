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
				/>
			</div>

			<div>
				<input
					type='email'
					name='newEmail'
					placeholder='New Email*'
					required
					maxLength={50}
				/>
			</div>
		</>
	);
}

export default ChangeEmail;
