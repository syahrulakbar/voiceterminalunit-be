module.exports = (sequelize, Sequelize) => {
	const IPConfiguration = sequelize.define("ipconfiguration", {
		deviceName: {
			type: Sequelize.STRING,
		},
		connectionType: {
			type: Sequelize.STRING,
		},
		address: {
			type: Sequelize.STRING,
		},
		netmask: {
			type: Sequelize.STRING,
		},
		gateway: {
			type: Sequelize.STRING,
		},
		dnsServer: {
			type: Sequelize.STRING,
		},
	});

	return IPConfiguration;
};
