const http = require("http");
const { logger } = require("../utils/logger.js");
const deviceStatusController = require("../controllers/deviceStatus.controller");

exports.start = (app) => {
	const server = http.createServer(app);
	const { Server } = require("socket.io");
	const io = new Server(server);

	io.on("connection", (socket) => {
		logger.info("a user connected");
		setInterval(() => {
			deviceStatusController.socketGetDeviceStatus().then((status) => {
				if (status) socket.emit("deviceStatus", status);
			});
		}, 1000);
	});

	let PORT = 3000;
	server.listen(PORT, () => {
		logger.info(`Socket is running on port ${PORT}.`);
	});
};
