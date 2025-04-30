import '../../css/setup.scss';
import GetConfirmationMessage from '../ConfirmationMessage';
import ErrorMessage from '../ErrorMessage';
import Select from 'react-select';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseBusiness() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [option, setOption] = useState('');
	const [message, setMessage] = useState(
		'Something went wrong.'
	);
	const [showConfirmation, setShowConfirmation] =
		useState(false);
	const [showError, setShowError] = useState(false);

	// Get a list of all business names and IDs from the DB
	React.useEffect(() => {
		const getBusinessNames = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/api/businesses/',
					{
						method: 'GET',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				const result = await response.json();

				if (response.ok) {
					const businesses = result.map((business) => ({
						value: business._id,
						label: business.name,
					}));

					setData(businesses);
				} else {
					setMessage(result.message);
					setShowError(true);
					console.error(
						'Error: response not ok:',
						response.error
					);
				}
			} catch (err) {
				console.error('Error: ', err.message);
			}
		};

		getBusinessNames();
	}, []);

	const setBusiness = async (event) => {
		event.preventDefault();

		const form = event.target;
		var formData = { type: option };

		if (option === 'existing') {
			const selectedBusinessId =
				form.selectedBusiness.value;
			formData = {
				...formData,
				business_id: selectedBusinessId,
			};
		}

		if (option === 'new') {
			formData = {
				...formData,
				beganSetup: true,
				lastStepCompleted: 0,
			};
			console.log('formData:', formData);
		}

		try {
			const response = await fetch(
				'http://localhost:5000/api/auth/set-business',
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
				if (option === 'existing') {
					localStorage.setItem(
						'business_id',
						result.business_id
					);

					setMessage(result.message);
					setShowConfirmation(true);
				} else if (option === 'new') {
					// Redirect on success
					navigate('/step1');
				} else {
					setMessage('Something went wrong.');
					setShowError(true);
				}
			} else {
				setMessage(result.message);
				setShowError(true);
			}
		} catch (err) {
			console.error('Error: ', err.message);
		}
	};

	return (
		<div className='set-up-container'>
			{showConfirmation ? (
				<GetConfirmationMessage
					message={message}
					destination={
						option === 'new' ? '/step1' : '/dashboard'
					}
				/>
			) : (
				<></>
			)}

			{showError ? (
				<ErrorMessage
					message={message}
					destination={0}
				/>
			) : (
				<></>
			)}

			<h1 className=''>Choose Business</h1>

			<form
				name='chooseBusinessForm'
				onSubmit={setBusiness}
				className='choose-business-form'
			>
				<div className='choose-business-container'>
					<div className='choose-business'>
						<div className='question'>
							Do you want to create a new business or join
							an existing one?
						</div>

						<div>
							<label
								key='new'
								className='radio-label'
							>
								<input
									type='radio'
									name='business'
									value='new'
									required
									onChange={() => setOption('new')}
								/>
								Create a new business
							</label>

							<label
								key='existing'
								className='radio-label'
							>
								<input
									type='radio'
									name='business'
									value='existing'
									onChange={() => setOption('existing')}
								/>
								Join an existing business
							</label>
						</div>
					</div>

					{option === 'existing' ? (
						<div className='business-options'>
							<div className='question'>
								Select a business:
							</div>

							<Select
								options={data}
								name='selectedBusiness'
								classNamePrefix='business'
							/>
						</div>
					) : (
						<></>
					)}
				</div>

				<div className='buttons'>
					<button
						type='submit'
						className='button'
					>
						Next
					</button>
				</div>
			</form>
		</div>
	);
}

export default ChooseBusiness;
