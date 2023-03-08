const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/user/login", controller.login);

	app.post("/api/user/refreshtoken", controller.refreshToken);

	app.post(
		"/api/users",
		[
			authJwt.verifyToken,
			verifySignUp.checkDuplicateEmail,
			verifySignUp.checkRolesExisted,
		],
		controller.create
	);

	app.delete("/api/users/:id", controller.delete);
};

