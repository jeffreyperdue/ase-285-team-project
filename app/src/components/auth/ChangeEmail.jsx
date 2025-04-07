function ChangeEmail() {
	return (
		<>
			<div>
				<input
					type='text'
					name='currentEmail'
					placeholder='Current Email*'
					required
				/>
			</div>

			<div>
				<input
					type='text'
					name='newEmail'
					placeholder='New Email*'
					required
				/>
			</div>
		</>
	);
}

export default ChangeEmail;
