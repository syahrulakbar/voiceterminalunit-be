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

	// app.get("/api/test/all", controller.allAccess);

	// app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

	// app.get(
	// 	"/api/test/admin",
	// 	[authJwt.verifyToken, authJwt.isAdmin],
	// 	controller.adminBoard
	// );
};
