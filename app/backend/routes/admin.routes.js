const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

const getBusinessId = async (email) => {
	const user = await User.findOne(
		{ email: email },
		{ business_id: 1 }
	);

	if (user) {
		const businessId = user.business_id;
		console.log('Business id found');
		return businessId;
	}

	return null;
};

// @route   POST /api/admin/get-user-list
// @desc    Get a list of users w/ the same business_id
// @access  Public (no auth yet)
router.post('/get-user-list', async (req, res) => {
	try {
		const { email } = req.cookies;
		const business_id = await getBusinessId(email);

		if (business_id === null || !business_id) {
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
			return res.status(401).json({
				error:
					'No users found with the specified business ID.',
			});
		}

		// Send response
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
			res
				.status(400)
				.json({ error: `Unknown action: ${action}` });
		}

		if (action === 'promote') {
			admin = true;
		}

		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{ $set: { admin: admin } },
			{ new: true }
		);

		if (updatedUser.admin !== admin) {
			return res
				.status(400)
				.json({ error: 'Error saving admin status' });
		}

		// Send response
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
			return res.status(400).json({
				error: `Business id not found. Business id: ${business_id}`,
			});
		}

		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{ $set: { business_id: '' } },
			{ new: true }
		);

		if (updatedUser.business_id !== '') {
			return res.status(400).json({
				error: 'Error removing user access',
			});
		}

		// Send response
		return res.status(200).json({
			message: 'User access removed successfully',
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
		const isAdmin = status === 'admin' ? true : false;

		if (business_id === null || !business_id) {
			return res.status(400).json({
				error: `Business id not found. Business id: ${business_id}`,
			});
		}

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
			return res.status(400).json({
				error: 'Error saving user access',
			});
		}

		// Send response
		return res.status(200).json({
			message: 'User access added successfully',
		});
	} catch (err) {
		res.status(400).json({
			error: 'Error adding user access: ' + err.message,
		});
	}
});

module.exports = router;
