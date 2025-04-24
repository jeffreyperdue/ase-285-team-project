import React from 'react';
import { Navigate } from 'react-router-dom';
import getCookie from '../assets/cookies';

const ProtectedRoute = ({ component }) => {
	const isAuthorized = getCookie('isAuthorized') === 'true';

	// Check user authorization status
	if (!isAuthorized) {
		// Redirect to sign-in page
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	// Render protected component
	return component;
};

export default ProtectedRoute;
