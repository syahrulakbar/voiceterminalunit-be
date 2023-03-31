module.exports = (sequelize, Sequelize) => {
  const Log = sequelize.define("logs", {
    cpu: {
      type: Sequelize.FLOAT,
    },
    memory: {
      type: Sequelize.FLOAT,
    },
    temperature: {
      type: Sequelize.FLOAT,
    },
  });

  return Log;
};
