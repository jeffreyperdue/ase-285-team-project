import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../css/setup.scss';
import axios from 'axios';

function SetUp({ step }) {
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
  
	const completeSetUp = async (event) => {
	  event.preventDefault();
	  
	  try {
		// Combine all form data
		const businessData = {
		  name: formData.name,
		  url: formData.url,
		  address: formData.address,
		  allergens: formData.allergens,
		  menuLayout: formData.menuLayout
		};
  
		// Send to API
		const response = await axios.post('/api/businesses', businessData);
		
		// Navigate to dashboard on success
		navigate('/dashboard', { state: { business: response.data } });
	  } catch (error) {
		console.error('Error creating business:', error);
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
