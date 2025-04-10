import '../css/styles.css';
import ProfileIcon from './ProfileIcon';
import '../css/Header.scss';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header className='header'>
			<div className='header-left'>
 				<Link to="/dashboard" className="header-link">
 					<h1 className='header-title'>NomNomSafe</h1>
 				</Link>
 			</div>
			<div className='header-right'>
				<ProfileIcon />
			</div>
		</header>
	);
}

export default Header;
