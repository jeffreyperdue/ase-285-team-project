import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../css/setup.scss';

function SetUp({ step }) {
	const navigate = useNavigate();

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

	const renderStep = () => {
		switch (step) {
			case 1:
				return <Step1 />;
			case 2:
				return <Step2 />;
			case 3:
				return <Step3 />;
			default:
				return (
					<div>
						There was an error signing you up. Please{' '}
						<a href='/'>try again</a>.
					</div>
				);
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

	const completeSetUp = (event) => {
		event.preventDefault();
		navigate('/dashboard');
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
