const controller = require("../controllers/maintenance.controller.js");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	/**
	 * @swagger
	 * /api/maintenance/connection-check/ip:
	 *   get:
	 *     tags:
	 *       - Maintenance
	 *     summary: Check device's IP Address
	 *     description: Check device's IP Address.
	 *     responses:
	 *       200:
	 *          description: Successfully logged in.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  ipAddress:
	 *                    type: string
	 *                    description: Device's IP Address.
	 *                    example: 192.168.6.126
	 */
	app.get("/api/maintenance/connection-check/ip", controller.getIPAddress);

	/**
	 * @swagger
	 * /api/maintenance/connection-check/status:
	 *   get:
	 *     tags:
	 *       - Maintenance
	 *     summary: Check device's connection status
	 *     description: Check device's connection by pinging to Google Open DNS (8.8.8.8).
	 *     responses:
	 *       200:
	 *          description: Device connected to configured IP address.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Message result.
	 *                    example: |
	 *                      8.8.8.8: Alive
	 */
	app.get(
		"/api/maintenance/connection-check/status",
		controller.connectionStatus
	);

	/**
	 * @swagger
	 * /api/maintenance/reboot:
	 *   post:
	 *     tags:
	 *       - Maintenance
	 *     summary: Reboot device
	 *     description: Reboot device
	 */
	app.post("/api/maintenance/reboot", controller.reboot);
};

