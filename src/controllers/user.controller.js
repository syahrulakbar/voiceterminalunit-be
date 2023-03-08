const db = require("../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
	User.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	})
		.then((user) => {
			if (req.body.roles) {
				Role.findAll({
					where: {
						name: req.body.roles,
					},
				}).then((roles) => {
					user.setRoles(roles).then(() => {
						res.send({
							message: "User was created successfully!",
						});
					});
				});
			} else {
				console.log("user role set to 1.");
				user.setRoles(1).then(() => {
					res.send({ message: "User was created successfully!" });
				});
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.delete = (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => {
			console.log(user);
			if (!user)
				return res.status(404).send({ message: "User not found." });
			else
				res.status(200).send({ message: "User deleted successfully." });
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
