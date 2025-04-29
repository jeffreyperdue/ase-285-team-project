import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCookie from '../assets/cookies';

function ProtectedRoute({ component, route, admin }) {
	const isAuthorized = getCookie('isAuthorized') === 'true';
	const isAdmin = getCookie('isAdmin') === 'true';
	const hasBusiness = getCookie('hasBusiness') === 'true';

	// Prevents user from accessing any pages if they're not logged in
	if (!isAuthorized) {
		if (route != 'signInUp') {
			// Redirect to sign-in page
			return (
				<Navigate
					to='/'
					replace
				/>
			);
		}

		return component;
	}

	/* The following statements only execute if the user is logged in. */

	// Prevents user from accessing sign in/up page if they're logged in
	if (route === 'signInUp') {
		// Redirect to dashboard
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	// Prevents non-admin users from accessing admin routes
	if (admin === true && !isAdmin) {
		// Redirect to dashboard
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	// Prevents users from accessing setup pages if they are associated w/ a business
	if (route === 'setup' && hasBusiness) {
		// Redirect to dashboard
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	// Prevents users from accessing business pages if they are not associated w/ a business
	if (route !== 'setup' && !hasBusiness) {
		// Redirect to setup page
		return (
			<Navigate
				to='/step1'
				replace
			/>
		);
	}

	// Render protected component
	return component;
}

// Prop validation
ProtectedRoute.propTypes = {
	component: PropTypes.element.isRequired,
	route: PropTypes.string,
	admin: PropTypes.bool,
};

export default ProtectedRoute;
