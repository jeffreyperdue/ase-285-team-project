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

export default getBusinessId;
