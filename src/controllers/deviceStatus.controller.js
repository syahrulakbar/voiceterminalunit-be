const process = require("process");

exports.getDeviceStatus = (req, res) => {
	var osu = require("node-os-utils");

	var cpu = osu.cpu;
	var mem = osu.mem;

	var status = {};

	mem.info()
		.then((info) => {
			console.log(info);
			status.memory = {};
			status.memory.used = info.usedMemPercentage;
			status.memory.free = info.freeMemPercentage;
			cpu.usage()
				.then((info) => {
					console.log(info);
					status.cpu = info;
					res.status(200).send({ message: status });
				})
				.catch((err) => {
					res.status(500).send({ message: err.message });
				});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
