const process = require("process");

exports.getDeviceStatus = (req, res) => {
	let status = {};
	const si = require("systeminformation");

	si.mem()
		.then((info) => {
			status.memory = parseFloat(
				((info.active / info.total) * 100).toFixed(2)
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
							res.status(500).send({ message: err.message });
						});
				})
				.catch((err) => {
					res.status(500).send({ message: err.message });
				});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
