const http = require("http");
const { logger, monitoringLogger } = require("../utils/logger.js");
const deviceStatusController = require("../controllers/deviceStatus.controller");

exports.start = (app) => {
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on("connection", (socket) => {
    logger.info("a user connected");

    let timeout = 1000;

    let monitorFunction = () => {
      deviceStatusController.socketGetDeviceStatus().then((status) => {
        if (status) {
          socket.emit("deviceStatus", status);
        }
      });
    };

    let loggingFunction = () => {
      deviceStatusController.socketGetDeviceStatus().then((status) => {
        if (status) {
          monitoringLogger.info(JSON.stringify(status));
        }
      });
    };

    let monitor = setInterval(monitorFunction, 1000);
    let logging = setInterval(loggingFunction, timeout);

    socket.on("deviceStatus", (data) => {
      if (data === "stop") {
        try {
          io.in(socket.id).disconnectSockets();
        } catch (error) {
          console.log(error);
        }
      }

      if (!isNaN(parseInt(data))) {
        timeout = Number(data) * 1000;
        clearInterval(logging);
        logging = setInterval(loggingFunction, timeout);
      }
    });
  });

  let PORT = process.env.WEBSOCKET_PORT || 3000;
  server.listen(PORT, () => {
    logger.info(`Socket is running on port ${PORT}.`);
  });
};

const startLog = (interval) => {
  setInterval(() => {
    deviceStatusController.socketGetDeviceStatus().then((status) => {
      if (status) {
        console.log(interval);
        socket.emit("deviceStatus", status);
        monitoringLogger.info(JSON.stringify(status));
      }
    });
  }, interval);
};
