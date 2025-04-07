import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

function Header() {
	const navigate = useNavigate();

	const toAdmin = (event) => {
		event.preventDefault();
		navigate('/admin');
	};

	return (
		<div
			className='header'
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<span className='header-title'>NomNom Safe</span>
			<button
				onClick={toAdmin}
				type='button'
			>
				Manage Access
			</button>
		</div>
	);
}

export default Header;
