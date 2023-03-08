const controller = require("../controllers/maintenance.controller.js");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/maintenance/connection-check/ip", controller.getIPAddress);
	app.get(
		"/api/maintenance/connection-check/status",
		controller.connectionStatus
	);
	app.post("/api/maintenance/reboot", controller.reboot);
};
