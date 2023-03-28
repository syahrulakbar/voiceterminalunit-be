const db = require("../models");
const Role = db.role;
const User = db.user;
const IPConfiguration = db.ipconfiguration;
const { logger } = require("../utils/logger.js");

const init = () => {
	db.sequelize.sync({ force: true }).then(() => {
		initial().then(() => {
			logger.info("Done syncing database.");
		});
	});

	const bcrypt = require("bcryptjs");

	const initial = async () => {
		User.create({
			email: "superadmin@mail.com",
			password: bcrypt.hashSync("123456", 8),
		}).then((user) => {
			user.setRoles(1);
		});
		User.create({
			email: "admin12@mail.com",
			password: bcrypt.hashSync("123456", 8),
		}).then((user) => {
			user.setRoles(2);
		});
		User.create({
			email: "admin23@mail.com",
			password: bcrypt.hashSync("123456", 8),
		}).then((user) => {
			user.setRoles(2);
		});

		Role.create({
			id: 1,
			name: "superadmin",
		});

		Role.create({
			id: 2,
			name: "admin",
		});

		IPConfiguration.create({
			deviceName: "VTU-1",
			connectionType: "dhcp",
		});
	};
};

module.exports = init;

