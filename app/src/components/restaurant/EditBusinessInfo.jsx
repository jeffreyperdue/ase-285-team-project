import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetConfirmationMessage from '../ConfirmationMessage';
import '../../css/EditBusinessInfo.css';

const EditBusinessInfo = () => {
	const [confirmation, setConfirmation] = useState(false);
	const navigate = useNavigate();

	const cancel = (event) => {
		event.preventDefault();
		navigate('/dashboard');
	};

	const save = (event) => {
		event.preventDefault();
		setConfirmation(true);
	};

	return (
		<form className='edit-business-info-container'>
			{confirmation ? (
				<GetConfirmationMessage type='edit-business-info' />
			) : (
				<></>
			)}

			<h1>Edit Business Information</h1>

			<div className='edit-business-info-form-fields'>
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

				<div className='form-column'>
					<div className='form-field-container'>
						<label>Business Name</label>
						<input type='text' />
					</div>

					<div className='form-field-container'>
						<label>Website URL</label>
						<input type='text' />
					</div>

					<div className='form-field-container'>
						<label>Address(es)</label>
						<input
							type='text'
							placeholder='Separate Multiple locations by a comma'
						/>
					</div>

					<div className='form-field-container'>
						<label>Phone Number</label>
						<input type='text' />
					</div>
				</div>

				<div className='form-column'>
					<div className='form-field-container'>
						<label>Business Disclaimer</label>
						<input type='text' />
					</div>

					<div className='form-field-container'>
						<label>Cuisine</label>
						<input
							type='text'
							placeholder='example: Mexican'
						/>
					</div>

					<div className='form-field-container'>
						<label>Special Preparations</label>
						<input
							type='text'
							placeholder='example: Kosher'
						/>
					</div>

					<div className='form-field-container'>
						<label>Hours</label>
						<input type='text' />
					</div>
				</div>
			</div>

			<div className='buttons edit-business-info'>
				<div>
					<button
						type='button'
						onClick={cancel}
						className='button gray-btn cancel-btn'
					>
						Cancel
					</button>
				</div>

				<div className='save-section'>
					<span className='save-note'>
						* This information will be displayed to users of
						the app
					</span>

					<button
						type='submit'
						onClick={save}
						className='button'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

export default EditBusinessInfo;
