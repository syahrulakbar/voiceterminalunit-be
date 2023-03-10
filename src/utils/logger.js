const { format, createLogger, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const combinedFormat = combine(timestamp(), myFormat);

exports.logger = createLogger({
	level: "info",
	format: combinedFormat,
	transports: [
		new transports.File({ filename: "src/logs/error.log", level: "error" }),
		new transports.File({ filename: "src/logs/combined.log" }),
	],
});
