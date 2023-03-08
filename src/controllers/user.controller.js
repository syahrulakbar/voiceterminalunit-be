const db = require("../models");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then(async (user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password.",
				});
			}

			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: config.jwtExpiration, // 24 hours
			});

			let refreshToken = await RefreshToken.createToken(user);

			user.getRoles().then((roles) => {
				res.status(200).send({
					id: user.id,
					email: user.email,
					roles: roles[0].name.toUpperCase(),
					accessToken: token,
					refreshToken: refreshToken,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.refreshToken = async (req, res) => {
	const { refreshToken: requestToken } = req.body;

	if (requestToken == null) {
		return res.status(403).json({ message: "Refresh Token is required!" });
	}

	try {
		let refreshToken = await RefreshToken.findOne({
			where: { token: requestToken },
		});

		console.log(refreshToken);

		if (!refreshToken) {
			res.status(403).json({
				message: "Refresh token is not in database!",
			});
			return;
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.destroy({ where: { id: refreshToken.id } });

			res.status(403).json({
				message:
					"Refresh token was expired. Please make a new signin request",
			});
			return;
		}

		const user = await refreshToken.getUser();
		let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: config.jwtExpiration,
		});

		return res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: refreshToken.token,
		});
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};

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

