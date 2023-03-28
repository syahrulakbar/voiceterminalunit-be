const IP = require("ip");
const { logger } = require("../utils/logger.js");
const db = require("../models");
const IPConfiguration = db.ipconfiguration;

exports.getIPAddress = (req, res) => {
	const ipAddress = IP.address();
	res.status(200).send({ ipAddress: ipAddress });
};

exports.connectionStatus = (req, res) => {
	try {
		const ping = require("net-ping");
		let session = ping.createSession();
		session.pingHost("8.8.8.8", function (error, target) {
			if (error)
				if (error instanceof ping.RequestTimedOutError) {
					return res
						.status(500)
						.send({ message: target + ": Not alive" });
				} else {
					return res
						.status(500)
						.send({ message: target + ": " + error.toString() });
				}
			else res.status(200).send({ message: target + ": Alive" });
		});
	} catch (err) {
		logger.error(err.message);
		if (err.message === "Operation not permitted")
			res.status(500).send({
				message:
					"Can't check connection. Try again with 'npm run start' instead.",
			});
		else {
			res.status(500).send({
				message:
					"Can't check connection. Please check application log.",
			});
		}
	}
};

exports.reboot = (req, res) => {
	require("child_process").exec("sudo /sbin/shutdown -r now", function (msg) {
		res.send(msg);
	});
};

exports.setConfig = (req, res) => {
	IPConfiguration.findAll().then((ipconfig) => {
		if (ipconfig.length === 0) {
			// Create
			IPConfiguration.create({
				...req.body,
			})
				.then((ipconfig) => {
					res.status(200).send({
						message: "IP Configuration was set successfully.",
					});
				})
				.catch((err) => {
					logger.error(err.message);
					res.status(500).send({
						message:
							"Failed to set IP Configuration. Please check application log.",
					});
				});
		} else {
			// Update
			if (req.body.connectionType === "dhcp") {
				req.body.address = null;
				req.body.netmask = null;
				req.body.gateway = null;
				req.body.dnsServer = null;
			}
			IPConfiguration.update(
				{
					...req.body,
				},
				{ where: { id: ipconfig[0].id } }
			)
				.then((ipconfig) => {
					res.status(200).send({
						message: "IP Configuration was set successfully.",
					});
				})
				.catch((err) => {
					logger.error(err.message);
					res.status(500).send({
						message:
							"Failed to set IP Configuration. Please check application log.",
					});
				});
		}
	});
};

exports.getConfig = (req, res) => {
	IPConfiguration.findOne()
		.then((ipconfig) => {
			if (!ipconfig)
				return res
					.status(404)
					.send({ message: "IP Configuration not found." });
			else
				res.status(200).send({
					message: "IP Configuration was fetched successfully.",
					data: ipconfig,
				});
		})
		.catch((err) => {
			logger.error(err.message);
			res.status(500).send({
				message:
					"Failed to fetch IP Configuration. Please check application log.",
			});
		});
};
