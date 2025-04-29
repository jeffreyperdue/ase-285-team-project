const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

// Returns the business_id of a user
const getBusinessId = async (email) => {
	// Get User document from the DB
	const user = await User.findOne(
		{ email: email },
		{ business_id: 1 }
	);

	if (!user) {
		// User not found in the DB
		return null;
	}

	const businessId = user.business_id;
	return businessId;
};

// @route   POST /api/admin/get-user-list
// @desc    Get a list of users w/ the same business_id
// @access  Public (no auth yet)
router.post('/get-user-list', async (req, res) => {
	try {
		const { email } = req.cookies;
		const business_id = await getBusinessId(email);

		if (business_id === null || !business_id) {
			// business_id or user does not exist
			return res.status(401).json({
				error: 'Business ID not found.',
			});
		}

		// Get array of users that have access to the business
		const users = await User.aggregate([
			{ $match: { business_id: business_id } },
			{
				$project: {
					_id: 0,
					first_name: 1,
					last_name: 1,
					email: 1,
					status: {
						$cond: {
							if: '$admin',
							then: 'admin',
							else: 'user',
						},
					},
				},
			},
		]);

		if (users.length === 0) {
			// No users are associated with the business_id
			return res.status(401).json({
				error:
					'No users found with the specified business ID.',
			});
		}

		// Send success response
		return res.status(200).json(users);
	} catch (err) {
		res.status(400).json({
			error: 'Error fetching user list: ' + err.message,
		});
	}
});

// @route   POST /api/admin/change-admin-status
// @desc    Change a user's admin status
// @access  Public (no auth yet)
router.post('/change-admin-status', async (req, res) => {
	try {
		const { action, targetEmail } = req.body;
		var admin = false;

		if (action !== 'promote' && action !== 'demote') {
			// The provided action is not allowed
			return res.status(400).json({
				error: `Unknown action: ${action}`,
				message: `Unknown action: ${action}.`,
			});
		}

		if (action === 'promote') {
			// User is being promoted to admin
			admin = true;
		}

		// Update the user's admin status in the DB
		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{ $set: { admin: admin } },
			{ new: true }
		);

		if (updatedUser.admin !== admin) {
			// Admin status was not updated in the DB
			return res.status(400).json({
				error: 'Error saving admin status',
				message: 'Error saving admin status.',
			});
		}

		// Send success response
		return res
			.status(200)
			.json({ message: `User ${action}d successfully` });
	} catch (err) {
		res.status(400).json({
			error: 'Error changing admin status: ' + err.message,
		});
	}
});

// @route   POST /api/admin/remove-user-access
// @desc    Remove a user's access to a specific business
// @access  Public (no auth yet)
router.post('/remove-user-access', async (req, res) => {
	try {
		const business_id = getBusinessId(req.cookies.email);
		const { email: targetEmail } = req.body;

		if (business_id === null || !business_id) {
			// business_id or user does not exist
			return res.status(400).json({
				error: `Business id not found. Business id: ${business_id}`,
				message: `Business id not found.`,
			});
		}

		// Remove user's business_id from the DB
		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{ $set: { business_id: '' } },
			{ new: true }
		);

		if (updatedUser.business_id !== '') {
			// User's business_id was not removed from the DB
			return res.status(400).json({
				error: 'Error removing user access',
				message: 'Error removing user access.',
			});
		}

		// Send success response
		return res.status(200).json({
			message: 'User access removed successfully.',
		});
	} catch (err) {
		res.status(400).json({
			error: 'Error changing business id: ' + err.message,
		});
	}
});

// @route   POST /api/admin/add-user-access
// @desc    Add a user's access to a specific business
// @access  Public (no auth yet)
router.post('/add-user-access', async (req, res) => {
	try {
		const business_id = await getBusinessId(
			req.cookies.email
		);
		const { email: targetEmail, status } = req.body;

		if (!targetEmail || !status) {
			// Data is missing
			return res.status(400).json({
				error: 'All fields are required.',
				message: 'All fields are required.',
			});
		}

		const isAdmin = status === 'admin' ? true : false;

		if (business_id === null || !business_id) {
			// business_id or user does not exist
			return res.status(400).json({
				error: `Business id not found. Business id: ${business_id}`,
				message: `Business id not found. Business id: ${business_id}`,
			});
		}

		// Update user's business_id & admin status in the DB
		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{
				$set: {
					business_id: business_id,
					admin: isAdmin,
				},
			},
			{ new: true }
		);

		if (updatedUser.business_id !== business_id) {
			// User's business_id and/or admin status was not changed in the DB
			return res.status(400).json({
				error: 'Error saving user access',
				message: 'Error saving user access.',
			});
		}

		// Send success response
		return res.status(200).json({
			message: 'User access added successfully.',
		});
	} catch (err) {
		res.status(400).json({
			error: 'Error adding user access: ' + err.message,
		});
	}
});

module.exports = router;
