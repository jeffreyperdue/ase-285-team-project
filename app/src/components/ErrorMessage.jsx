import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/auth.scss';

function ErrorMessage({ message, destination }) {
	const navigate = useNavigate();

	const nav = (event) => {
		event.preventDefault();
		navigate(destination);
	};

	return (
		<div className='error-container'>
			{message}
			<button
				type='button'
				onClick={nav}
				className='button error-btn'
			>
				Ok
			</button>
		</div>
	);
}

// Prop validation
ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
	destination: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

export default ErrorMessage;
