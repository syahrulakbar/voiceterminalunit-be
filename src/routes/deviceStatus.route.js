const controller = require("../controllers/deviceStatus.controller.js");

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
	 * /api/device-status:
	 *   get:
	 *     tags:
	 *       - Device Status
	 *     summary: Check device status
	 *     description: Check device status such as CPU & RAM usage and Temperature.
	 *     responses:
	 *       200:
	 *          description: Get device status success.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  memory:
	 *                    type: number
	 *                    description: Memory (RAM) usage in %.
	 *                    example: 68.89
	 *                  cpu:
	 *                    type: number
	 *                    description: CPU usage in %.
	 *                    example: 84.1
	 *                  temperature:
	 *                    type: number
	 *                    description: CPU temperature in C.
	 *                    example: 59
	 */
	app.get("/api/device-status", controller.getDeviceStatus);
};

