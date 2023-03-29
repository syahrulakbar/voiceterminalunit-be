const { format, createLogger, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${new Date().toLocaleString()} ${level}: ${message}`;
});

const monitorFormat = printf(({ level, message, timestamp }) => {
  return `${new Date().toISOString()} | ${level} | ${message}`;
});

const combinedFormat = combine(timestamp(), myFormat);
const combinedMonitorFormat = combine(timestamp(), monitorFormat);

exports.logger = createLogger({
  level: "info",
  format: combinedFormat,
  transports: [
    new transports.File({ filename: "src/logs/error.log", level: "error" }),
    new transports.File({ filename: "src/logs/combined.log" }),
  ],
});

exports.monitoringLogger = createLogger({
  level: "info",
  format: monitorFormat,
  transports: [new transports.File({ filename: "src/logs/deviceStatus.log" })],
});
