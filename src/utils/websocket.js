const http = require("http");
const { logger, monitoringLogger } = require("../utils/logger.js");
const deviceStatusController = require("../controllers/deviceStatus.controller");
const log = require("../controllers/log.controller.js");

exports.start = (app) => {
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server);
  let allClients = [];

  io.on("connection", (socket) => {
    logger.info("a user connected");
    allClients.push(socket);

    socket.on("disconnect", function () {
      logger.info("a user disconnected");
      let i = allClients.indexOf(socket);
      allClients.splice(i, 1);
      try {
        io.in(socket.id).disconnectSockets();
        clearInterval(logging);
      } catch (error) {
        logger.error(error);
      }
    });

    let timeout = 1000;

    let monitoringFunction = () => {
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
          log.save(status);
        }
      });
    };

    let monitoring = setInterval(monitoringFunction, 1000);
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
        clearInterval(monitoring);
        logging = setInterval(loggingFunction, timeout);
        monitoring = setInterval(monitoringFunction, timeout);
      }
    });
  });

  let PORT = process.env.WEBSOCKET_PORT || 3000;
  server.listen(PORT, () => {
    logger.info(`Socket is running on port ${PORT}.`);
  });
};
