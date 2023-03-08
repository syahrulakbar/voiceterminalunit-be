const db = require("../models");
const Role = db.role;
const User = db.user;

const init = () => {
	db.sequelize.sync({ force: true }).then(() => {
		console.log("Drop and Resync Db ...");
		initial();
	});

	const bcrypt = require("bcryptjs");

	function initial() {
		User.create({
			email: "superadmin@mail.com",
			password: bcrypt.hashSync("123456", 8),
		}).then((user) => {
			user.setRoles(1);
		});

		Role.create({
			id: 1,
			name: "superadmin",
		});

		Role.create({
			id: 2,
			name: "admin",
		});
	}
};

module.exports = init;

