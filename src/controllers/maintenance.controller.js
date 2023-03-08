exports.getIPAddress = (req, res) => {
	const IP = require("ip");
	const ipAddress = IP.address();
	res.status(200).send({ ipAddress: ipAddress });
};

exports.connectionStatus = (req, res) => {
	const ping = require("net-ping");
	try {
		var session = ping.createSession();
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
		if (err.message === "Operation not permitted")
			res.status(500).send({
				message:
					"Can't check connection. Try again with 'npm run start' instead.",
			});
	}
};

exports.reboot = (req, res) => {
	require("child_process").exec("sudo /sbin/shutdown -r now", function (msg) {
		res.send(msg);
	});
};
