require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbSync = require("./middleware/dbsync.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.js").swaggerSpec;

const app = express();

let corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// syncronize db
if (process.env.NODE_ENV == "production") {
	db.sequelize.sync();
} else {
	dbSync();
}

// swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
require("./routes/user.route.js")(app);
require("./routes/deviceStatus.route.js")(app);
require("./routes/maintenance.route.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

