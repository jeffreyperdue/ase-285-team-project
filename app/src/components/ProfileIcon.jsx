import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../icons/avatar.png';
import editLoginIcon from '../icons/edit_login.png';
import editBusinessIcon from '../icons/edit_business.png';
import logoutIcon from '../icons/logout.png';
import '../css/ProfileIcon.css';

export default function ProfileIcon() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const navigate = useNavigate();

	const toEditLogin = () => {
		setIsOpen(false);
		navigate('/changeLogin');
	};

	const toEditBusinessInfo = () => {
		setIsOpen(false);
		navigate('/create-restaurant');
	};

	const logout = () => {
		setIsOpen(false);
		navigate('/');
	};

	return (
		<div className='profile-icon-container'>
			<img
				src={avatar}
				alt='User Profile'
				className='avatar-icon'
				onClick={toggleDropdown}
			/>

			{isOpen && (
				<div className='dropdown-menu'>
					<div
						onClick={toEditLogin}
						className='dropdown-item'
					>
						<img
							src={editLoginIcon}
							alt='Edit Login'
						/>
						<span>Edit Login Info</span>
					</div>
					<div
						onClick={toEditBusinessInfo}
						className='dropdown-item'
					>
						<img
							src={editBusinessIcon}
							alt='Edit Business'
						/>
						<span>Edit Business Info</span>
					</div>
					<div
						onClick={logout}
						className='dropdown-item'
					>
						<img
							src={logoutIcon}
							alt='Logout'
						/>
						<span>Log Out</span>
					</div>
				</div>
			)}
		</div>
	);
}
