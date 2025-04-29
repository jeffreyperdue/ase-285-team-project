const express = require('express');
const router = express.Router();
const User = require('../schemas/User');
const cookies = require('../utils/cookies');

// @route   POST /api/auth/signin
// @desc    Get a user
// @access  Public (no auth yet)
router.post('/signin', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			// Email or password is missing
			return res.status(400).json({
				error: 'Email and password are required',
				message: 'Email and password are required.',
			});
		}

		// Get User document from the DB
		const foundUser = await User.findOne({ email: email });

		if (!foundUser) {
			// Email is wrong or doesn't exist
			return res.status(401).json({
				error: 'Invalid email',
				message: 'Invalid email.',
			});
		}

		// Check that the password is correct
		const passwordMatches = await foundUser.comparePassword(
			password
		);

		if (!passwordMatches) {
			// Password is wrong
			return res.status(401).json({
				error: 'Password is incorrect',
				message: 'Password is incorrect.',
			});
		}

		// Set cookies
		cookies.setCookies(res, foundUser);

		// Send success response w/ user's data
		res.status(200).json(foundUser);
	} catch (err) {
		res.status(500).json({
			error: 'Could not fetch user' + err.message,
			message: 'Could not fetch user.',
		});
	}
});

// @route   POST /api/auth/signup
// @desc    Create a new user
// @access  Public (no auth yet)
router.post('/signup', async (req, res) => {
	try {
		const { first_name, last_name, email, password } =
			req.body;

		// Check if any fields are missing
		if (!first_name || !last_name || !email || !password) {
			return res
				.status(400)
				.json({ error: 'All fields are required.' });
		}

		// Create new User document from request body
		const newUser = new User({
			first_name,
			last_name,
			email,
			password,
			business_id: '',
			menu_item_layout: 0,
			admin: true,
		});

		// Save new user to DB
		const savedUser = await newUser.save();

		if (!savedUser) {
			// User was not saved
			return res.status(400).json({
				error: 'Error saving user: ' + err.message,
			});
		}

		// Set cookies
		cookies.setCookies(res, newUser);

		// Send response
		return res.status(201).json(savedUser);
	} catch (err) {
		res.status(400).json({
			error: 'Error creating user: ' + err.message,
		});
	}
});

// @route   POST /api/auth/logout
// @desc    Log out
// @access  Public (no auth yet)
router.post('/logout', async (req, res) => {
	try {
		// Clear cookies
		cookies.clearAllCookies(req, res);

		// Send response
		return res
			.status(200)
			.json({ message: 'Logged out successfully.' });
	} catch (err) {
		res.status(400).json({
			error: 'Error logging out: ' + err.message,
		});
	}
});

// @route   POST /api/auth/edit-login
// @desc    Change email or password
// @access  Public (no auth yet)
router.post('/edit-login', async (req, res) => {
	try {
		const { credType, currentCred, newCred } = req.body;
		const { email: currentEmail } = req.cookies;

		// Check if any data is missing
		if (!credType || !newCred || !currentCred) {
			return res.status(401).json({
				message: 'All fields are required.',
			});
		}

		// Handle email change
		if (credType === 'email') {
			// Check that the new email does not already exist in the DB
			const emailExists = await User.findOne({
				email: newCred,
			});

			if (emailExists) {
				// Email already exists in the DB
				return res.status(400).json({
					error: 'Email already exists',
					message: 'Email already exists.',
				});
			}

			// Update the user's email in the DB
			const updatedUser = await User.findOneAndUpdate(
				{ email: currentEmail },
				{ $set: { email: newCred } },
				{ new: true }
			);

			if (updatedUser && updatedUser.email !== newCred) {
				// Email was not saved to the DB
				return res
					.status(400)
					.json({ message: 'Error saving email' });
			}

			// Update the email cookie
			cookies.updateCookie(res, 'email', newCred);

			// Send response
			return res.status(200).json({
				message: 'Email changed successfully.',
			});
		}

		// Handle password change
		if (credType === 'password') {
			// Get User document from the DB
			const user = await User.findOne({
				email: currentEmail,
			});

			if (!user) {
				// Email does not exist in the DB
				return res.status(200).json({
					message: 'User not found.',
				});
			}

			// Check that the current password is correct
			const currentMatchesDb = await user.comparePassword(
				currentCred
			);

			if (!currentMatchesDb) {
				// Current password is incorrect
				return res.status(400).json({
					error: 'Current password is incorrect',
					message: 'Current password is incorrect.',
				});
			}

			// Check that the new password is not the same as the current password
			if (newCred === currentCred) {
				return res.status(400).json({
					error: `New ${credType} must be different from current ${credType}`,
					message: `New ${credType} must be different from current ${credType}.`,
				});
			}

			// Change and save user password (save() is required for hashing)
			user.password = newCred;
			await user.save();

			// Send response
			return res.status(200).json({
				message: 'Password changed successfully.',
			});
		}

		// Invalid credential was given
		return res
			.status(400)
			.json({ error: 'Credential cannot be changed' });
	} catch (err) {
		res.status(400).json({
			error: 'Error changing login info: ' + err.message,
		});
	}
});

module.exports = router;
