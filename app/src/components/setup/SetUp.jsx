import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../css/setup.scss';

function SetUp({ step }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
	  // Step 1 data
	  name: '',
	  url: '',
	  address: '',
	  // Step 2 data
	  allergens: [],
	  diets: [],
	  // Step 3 data
	  menuLayout: ''
	});

	const getProgressBarClass = () => {
		switch (step) {
		  case 1:
			return 'one-third';
		  case 2:
			return 'two-thirds';
		  case 3:
			return 'three-thirds';
		  default:
			return '';
		}
	  };
  
	  const completeSetUp = async (event) => {
		event.preventDefault();
	  
		try {
		  const businessId = localStorage.getItem('business_id');
	  
		  if (!businessId) {
			throw new Error('No Business ID found. Cannot complete setup.');
		  }
	  
		  const businessData = {
			name: formData.name,
			url: formData.url,
			address: formData.address,
			allergens: formData.allergens,
			diets: formData.diets,
			menuLayout: formData.menuLayout
		  };
	  
		  const response = await fetch(`/api/businesses/${businessId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(businessData)
		  });
	  
		  if (!response.ok) throw new Error('Failed to update business');
	  
		  const updatedBusiness = await response.json();
	  
		  navigate('/dashboard', { state: { business: updatedBusiness } });
		} catch (error) {
		  console.error('Error completing setup:', error);
		}
	  };
	  
  
	const updateFormData = (stepData) => {
	  setFormData(prev => ({ ...prev, ...stepData }));
	};
  
	const renderStep = () => {
	  switch (step) {
		case 1:
		  return <Step1 updateFormData={updateFormData} />;
		case 2:
		  return <Step2 updateFormData={updateFormData} />;
		case 3:
		  return <Step3 updateFormData={updateFormData} />;
		default:
		  return <div>Error...</div>;
	  }
	};

	const continueSetUp = (event) => {
		event.preventDefault();

		if (step === 1) {
			navigate('/step2');
		} else if (step === 2) {
			navigate('/step3');
		}
	};

	const navigateBack = (event) => {
		event.preventDefault();
		navigate(`/step${step - 1}`);
	};

	// TO DO: add proper route to dashboard for case 3
	const renderBtns = () => {
		switch (step) {
			case 1:
				return (
					<button
						form=''
						type='submit'
						onClick={continueSetUp}
						className='set-up-btn button'
					>
						Continue
					</button>
				);
			case 2:
				return (
					<button
						form=''
						type='submit'
						onClick={continueSetUp}
						className='button'
					>
						Continue
					</button>
				);
			case 3:
				return (
					<button
						form=''
						type='submit'
						onClick={completeSetUp}
						className='button'
					>
						Go To Dashboard
					</button>
				);
			default:
				return <></>;
		}
	};

	return (
		<div className='set-up-container'>
			<div
				className={`progress-bar ${getProgressBarClass()}`}
			>
				Step {step}/3
			</div>

			<div className={`step${step}`}>{renderStep()}</div>

			<div className='buttons'>
				{step !== 1 ? (
					<button
						onClick={navigateBack}
						className='button gray-btn back-btn'
					>
						Back
					</button>
				) : (
					<></>
				)}

				{renderBtns()}
			</div>
		</div>
	);
}

SetUp.propTypes = {
	step: PropTypes.number.isRequired,
};

export default SetUp;
