import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/MenuCard.css';

export default function MenuCard({
	title,
	description,
	buttonLabel,
}) {
	const navigate = useNavigate();

	const toMenu = () => {
		// TO DO: add correct route to menu
		navigate('/dashboard');
	};

	return (
		<div className='menu-card'>
			<h3 className='menu-title'>{title}</h3>
			<p className='menu-description'>{description}</p>
			<button
				onClick={toMenu}
				className='view-menu-button'
			>
				{buttonLabel}
			</button>
		</div>
	);
}
