// const si = require("systeminformation");
var osu = require("node-os-utils");
const { logger } = require("../utils/logger.js");

exports.getDeviceStatus = (req, res) => {
  let status = {};
  osu
    .mem()
    .then((memoryMb) => {
      status.memory = memoryMb;
      osu.cpu
        .usage()
        .then((cpuPercentage) => {
          status.cpu = cpuPercentage;
          try {
            getCPUTemp().then((cpuTemp) => {
              status.temp = cpuTemp;
              res.status(200).send({ ...status });
            });
          } catch (err) {
            logger.error(err);
          }
        })
        .catch((err) => {
          logger.error(err.message);
        });
    })
    .catch((err) => {
      logger.error(err.message);
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
            try {
              getCPUTemp().then((cpuTemp) => {
                status.temp = cpuTemp;
                resolve(status);
              });
            } catch (err) {
              logger.error(err);
            }
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

const getCPUTemp = () => {
  return new Promise((resolve, reject) => {
    if (process.platform === "linux") {
      let spawn = require("child_process").spawn;
      let temp = spawn("cat", ["/sys/class/thermal/thermal_zone0/temp"]);

      temp.stdout.on("data", function (data) {
        resolve(data / 1000);
      });
    }
  });
};
