require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbSync = require("./middleware/dbsync.js");

const app = express();

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV == "production") {
	db.sequelize.sync();
} else {
	dbSync();
}

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Voice Terminal Unit API." });
});

require("./routes/auth.route.js")(app);
require("./routes/user.route.js")(app);
require("./routes/deviceStatus.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
