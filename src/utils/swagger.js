const swaggerJSDoc = require("swagger-jsdoc");
const version = require("../../package.json");

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Voice Terminal Unit API",
		...version,
		description: "Documentation for Voice Terminal Unit API",
	},
	servers: [
		{
			url: "http://localhost:8080",
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: ["./src/routes/*.js"],
};

exports.swaggerSpec = swaggerJSDoc(options);
