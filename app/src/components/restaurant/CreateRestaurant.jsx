import React from 'react';
import { useState } from 'react';
import GetConfirmationMessage from '../ConfirmationMessage';
import '../../css/CreateRestaurant.css';

const CreateRestaurant = () => {
	const [confirmation, setConfirmation] = useState(false);

	const save = (event) => {
		event.preventDefault();
		setConfirmation(true);
	};

	return (
		<div className='restaurant-container'>
			{confirmation ? (
				<GetConfirmationMessage type='change-business-info' />
			) : (
				<></>
			)}

			<div className='top-section'>
				<div className='logo-upload'>
					<div className='upload-box'>
						↑<br />
						Upload
						<br />
						Business
						<br />
						Logo
					</div>
				</div>

				<div className='form-columns'>
					<div className='form-left'>
						<label>Business Name</label>
						<input type='text' />
						<label>Website URL</label>
						<input type='text' />
						<label>Address(es)</label>
						<input
							type='text'
							placeholder='Separate Multiple locations by a comma'
						/>
						<label>Phone Number</label>
						<input type='text' />
					</div>

					<div className='form-right'>
						<label>Business Disclaimer</label>
						<input type='text' />
						<label>Cuisine</label>
						<input
							type='text'
							placeholder='example: Mexican'
						/>
						<label>Special Preparations</label>
						<input
							type='text'
							placeholder='example: Kosher'
						/>
						<label>Hours</label>
						<input type='text' />
					</div>
				</div>
			</div>

			<div className='save-section'>
				<p className='note'>
					* This information will be displayed to users of
					the app
				</p>
				<button
					type='submit'
					onClick={save}
					className='save-button'
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default CreateRestaurant;
