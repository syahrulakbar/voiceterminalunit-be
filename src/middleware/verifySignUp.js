const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((user) => {
		if (user) {
			res.status(400).send({
				message: "Failed! Email is already in use!",
			});
			return;
		}
		next();
	});
};

const checkRolesExisted = (req, res, next) => {
	if (!ROLES.includes(req.body.roles)) {
		res.status(400).send({
			message: `Role '${req.body.roles}' does not exist!`,
		});
		return;
	}

	next();
};

const verifySignUp = {
	checkDuplicateEmail: checkDuplicateEmail,
	checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;

