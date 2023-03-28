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

	/**
	 * @swagger
	 * /api/maintenance/ipconfig:
	 *   post:
	 *     tags:
	 *      - Maintenance
	 *     summary: Set IP Configuration
	 *     description: Set IP Configuration
	 *     requestBody:
	 *      description: IP Configuration
	 *      content:
	 *        application/json:
	 *          schema:
	 *            type: object
	 *            properties:
	 *              connectionType:
	 *                type: string
	 *                description: Connection type (static or dhcp)
	 *                example: static
	 *              address:
	 *                type: string
	 *                description: IP address
	 *                example: 192.168.56.1
	 *              netmask:
	 *                type: string
	 *                description: Netmask
	 *                example: 255.255.255.0
	 *              gateway:
	 *                type: string
	 *                description: Gateway
	 *                example: 192.168.6.1
	 *              dnsServer:
	 *                type: string
	 *                description: DNS Server
	 *                example: 1.1.1.1
	 *     responses:
	 *       200:
	 *          description: Successfully set IP configuration.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Message result.
	 *                    example: IP Configuration was set successfully.
	 *       500:
	 *          description: Error setting IP configuration.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Message result.
	 *                    example: Failed to set IP Configuration. Please check application log.
	 *
	 */
	app.post("/api/maintenance/ipconfig", controller.setConfig);

	/**
	 * @swagger
	 * /api/maintenance/ipconfig:
	 *   get:
	 *     tags:
	 *       - Maintenance
	 *     summary: Check device's IP Address configuration
	 *     description: Check device's IP Address configuration.
	 *     responses:
	 *       200:
	 *          description: IP Configuration was fetched successfully.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Message result.
	 *                    example: IP Configuration was fetched successfully.
	 *                  data:
	 *                    type: object
	 *                    properties:
	 *                     id:
	 *                       type: number
	 *                       description: ID
	 *                       example: 1
	 *                     deviceName:
	 *                       type: string
	 *                       description: Device name
	 *                       example: VTU-1
	 *                     connectionType:
	 *                       type: string
	 *                       description: Connection type (static or dhcp)
	 *                       example: static
	 *                     address:
	 *                       type: string
	 *                       description: IP address
	 *                       example: 192.168.56.1
	 *                     netmask:
	 *                       type: string
	 *                       description: Netmask
	 *                       example: 255.255.255.0
	 *                     gateway:
	 *                       type: string
	 *                       description: Gateway
	 *                       example: 192.168.6.1
	 *                     dnsServer:
	 *                       type: string
	 *                       description: DNS Server
	 *                       example: 1.1.1.1
	 *                     createdAt:
	 *                       type: string
	 *                       description: Created at
	 *                       example: 2023-03-28T08:09:33.453Z
	 *                     updatedAt:
	 *                       type: string
	 *                       description: Updated at
	 *                       example: 2023-03-28T08:09:33.453Z
	 */
	app.get("/api/maintenance/ipconfig", controller.getConfig);
};
