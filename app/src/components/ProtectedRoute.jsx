import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCookie from '../assets/cookies';

function ProtectedRoute({ admin, component }) {
	const isAuthorized = getCookie('isAuthorized') === 'true';
	const isAdmin = getCookie('isAdmin');

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

	// Check user admin status (if necessary)
	if (admin === true && isAdmin !== 'true') {
		// Redirect to dashboard
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	// Render protected component
	return component;
}

// Prop validation
ProtectedRoute.propTypes = {
	admin: PropTypes.bool,
	component: PropTypes.element.isRequired,
};

export default ProtectedRoute;
