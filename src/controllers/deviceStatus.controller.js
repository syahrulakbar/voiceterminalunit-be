const si = require("systeminformation");
const { logger } = require("../utils/logger.js");

exports.getDeviceStatus = (req, res) => {
	let status = {};

	si.mem()
		.then((info) => {
			status.memory = parseFloat(
				(info.active / 1000**2).toFixed(2)
			);
			si.currentLoad()
				.then((info) => {
					status.cpu = parseFloat(info.currentLoad.toFixed(2));
					si.cpuTemperature()
						.then((info) => {
							status.temperature = info.main;
							res.status(200).send({ ...status });
						})
						.catch((err) => {
							logger.error(err.message);
							res.status(500).send({
								message:
									"Failed to get Device Status. Please check application log.",
							});
						});
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

		si.mem()
			.then((info) => {
				status.memory = parseFloat(
					(info.active / 1000**2).toFixed(2)
				);
				si.currentLoad()
					.then((info) => {
						status.cpu = parseFloat(info.currentLoad.toFixed(2));
						si.cpuTemperature()
							.then((info) => {
								status.temperature = info.main;
								resolve(status);
							})
							.catch((err) => {
								logger.error(err.message);
							});
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

