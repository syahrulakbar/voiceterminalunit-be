const db = require("../models");
const { logger } = require("../utils/logger");
const Log = db.log;

exports.save = (status) => {
  return new Promise((resolve, reject) => {
    Log.create({
      ...status,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.fetchAll = (req, res) => {
  Log.findAll()
    .then((logs) => {
      res.status(200).send(logs);
    })
    .catch((err) => {
      logger.error(err.message);
    });
};
