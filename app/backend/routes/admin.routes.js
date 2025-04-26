const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

// @route   POST /api/admin/get-user-list
// @desc    Get a list of users w/ the same business_id
// @access  Public (no auth yet)
router.post('/get-user-list', async (req, res) => {
	try {
		const email = req.cookies.email;
		const user = await User.findOne(
			{ email: email },
			{ business_id: 1 }
		);

		if (user) {
			console.log('user found');
		}
		const business_id = user.business_id;

		console.log('businessId:', business_id);

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

		console.log('users:', users);
		res.status(200).json(users);
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
		const action = req.body.action;
		const targetEmail = req.body.targetEmail;

		if (action !== 'promote' && action !== 'demote') {
			res
				.status(400)
				.json({ error: `Unknown action: ${action}` });
		}

		var admin = false;

		if (action === 'promote') {
			admin = true;
		}

		const updatedUser = await User.findOneAndUpdate(
			{ email: targetEmail },
			{ $set: { admin: admin } },
			{ new: true }
		);

		if (updatedUser.admin === admin) {
			res
				.status(200)
				.json({ message: `User ${action}d successfully` });
		}

		res
			.status(400)
			.json({ error: 'Error saving admin status' });
	} catch (err) {
		res.status(400).json({
			error: 'Error changing admin status: ' + err.message,
		});
	}
});

module.exports = router;
