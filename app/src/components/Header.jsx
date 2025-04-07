import '../css/styles.css';
import ProfileIcon from './ProfileIcon';
import '../css/Header.css';

function Header() {
	return (
		<header className='header'>
			<div className='header-left'>
				<h1 className='header-title'>NomNomSafe</h1>
			</div>
			<div className='header-right'>
				<ProfileIcon />
			</div>
		</header>
	);
}

export default Header;
