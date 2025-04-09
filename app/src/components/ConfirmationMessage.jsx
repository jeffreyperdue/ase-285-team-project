import { useNavigate } from 'react-router-dom';
import '../css/auth.scss';

function GetConfirmationMessage({ type }) {
	const navigate = useNavigate();

	const toDashboard = (event) => {
		event.preventDefault();
		navigate('/dashboard');
	};

	if (type === 'change-login-info') {
		return (
			<div className='confirmation-container'>
				Login information changed successfully.
				<button
					type='button'
					onClick={toDashboard}
					className='button'
				>
					Ok
				</button>
			</div>
		);
	}

	if (type === 'change-business-info') {
		return (
			<div className='confirmation-container'>
				Business information changed successfully.
				<button
					type='button'
					onClick={toDashboard}
					className='button'
				>
					Ok
				</button>
			</div>
		);
	}

	return <div className='confirmation-container'></div>;
}

export default GetConfirmationMessage;
