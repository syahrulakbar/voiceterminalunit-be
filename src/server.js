require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbSync = require("./middleware/dbsync.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.js").swaggerSpec;
const winston = require("winston");
const { logger, combinedFormat } = require("./utils/logger.js");
const websocket = require("./utils/websocket.js");
const db = require("./models");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// synchronize db
if (process.env.NODE_ENV == "production") {
  db.sequelize.sync();
} else {
  dbSync();
}

// logger
logger.add(
  new winston.transports.Console({
    format: combinedFormat,
  })
);

// swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
require("./routes/user.route.js")(app);
require("./routes/deviceStatus.route.js")(app);
require("./routes/maintenance.route.js")(app);
require("./routes/log.route.js")(app);

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

websocket.start(app);
