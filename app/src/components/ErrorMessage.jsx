import { useNavigate } from 'react-router-dom';
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

export default ErrorMessage;
