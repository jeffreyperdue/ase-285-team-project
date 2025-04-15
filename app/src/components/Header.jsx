import '../css/styles.css';
import '../css/Header.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';

function Header() {
	const navigate = useNavigate();
	const authorized = false;

	const toHome = (event) => {
		event.preventDefault();

		if (authorized === false) {
			navigate('/');
		} else {
			navigate('/dashboard');
		}
	};

	return (
		<header className='header'>
			<div className='header-left'>
				<h1
					onClick={toHome}
					className='header-title'
				>
					NomNom Safe
				</h1>
			</div>
			<div className='header-right'>
				<ProfileIcon />
			</div>
		</header>
	);
}

export default Header;
