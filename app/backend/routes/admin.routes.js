const express = require('express');
const router = express.Router();
const User = require('../schemas/User');
import getBusinessId from '../assets/getBusinessId';

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

		const business_id = user.business_id;

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

		if (updatedUser.admin === admin) {
			res
				.status(200)
				.json({ message: `User ${action}d successfully` });
		} else {
			res
				.status(400)
				.json({ error: 'Error saving admin status' });
		}
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
		const userEmail = req.cookies.email;
		const targetEmail = req.body.email;
		const business_id = getBusinessId(userEmail);

		if (business_id !== null) {
			const updatedUser = await User.findOneAndUpdate(
				{ email: targetEmail },
				{ $set: { business_id: '' } },
				{ new: true }
			);

			if (updatedUser.business_id === '') {
				res.status(200).json({
					message: 'User access removed successfully',
				});
			} else {
				res.status(400).json({
					error: 'Error removing user access',
				});
			}
		} else {
			res.status(400).json({
				error: `Business id not found. Business id: ${business_id}`,
			});
		}
	} catch (err) {
		res.status(400).json({
			error: 'Error changing business id: ' + err.message,
		});
	}
});

module.exports = router;
