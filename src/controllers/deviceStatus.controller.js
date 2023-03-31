// const si = require("systeminformation");
var osu = require("node-os-utils");
const { logger } = require("../utils/logger.js");

exports.getDeviceStatus = (req, res) => {
  let status = {};
  let allClients = [];
  let runtime = 1;
  io.on("connection", (client) => {
    allClients.push(client);
    client.on("disconnect", function () {
      console.log("Got disconnect!");
      let i = allClients.indexOf(client);
      allClients.splice(i, 1);
    });
    client.on("message", (message) => {
      runtime = message;
    });
    osu
      .mem()
      .then((memoryMb) => {
        status.memory = memoryMb;
        osu.cpu
          .usage()
          .then((cpuPercentage) => {
            status.cpu = cpuPercentage;
            res.status(200).send({ ...status });
          })
          .catch((err) => {
            logger.error(err.message);
          });
      })
      .catch((err) => {
        logger.error(err.message);
      });
  });
};

exports.socketGetDeviceStatus = () => {
  return new Promise((resolve, reject) => {
    let status = {};
    osu.mem
      .info()
      .then((memoryMb) => {
        status.memory = memoryMb;
        osu.cpu
          .usage()
          .then((cpuPercentage) => {
            status.cpu = cpuPercentage;
            resolve(status);
          })
          .catch((err) => {
            logger.error(err.message);
          });
      })
      .catch((err) => {
        logger.error(err.message);
      });
  });
};
