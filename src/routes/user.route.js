const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	/**
	 * @swagger
	 * /api/users/login:
	 *   post:
	 *     tags:
	 *       - User Management
	 *     summary: Logs user into application
	 *     description: Logs user into application using registered email & password.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *                email:
	 *                  type: string
	 *                  description: The user's email.
	 *                  example: superadmin@mail.com
	 *                password:
	 *                  type: string
	 *                  description: The user's password.
	 *                  example: 123456
	 *     responses:
	 *       200:
	 *          description: Successfully logged in.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  id:
	 *                    type: string
	 *                    description: User's uuid.
	 *                    example: a588f982-af3e-4b9e-85dc-4e662e93a8be
	 *                  email:
	 *                    type: string
	 *                    description: User's email.
	 *                    example: superadmin@mail.com
	 *                  roles:
	 *                    type: string
	 *                    description: User's role.
	 *                    example: SUPERADMIN
	 *                  accessToken:
	 *                    type: string
	 *                    description: User's access token to access API.
	 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ODhmOTgyLWFmM2UtNGI5ZS04NWRjLTRlNjYyZTkzYThiZSIsImlhdCI6MTY3ODMwODMwMywiZXhwIjoxNjc4MzExOTAzfQ.S6o8jOirnqTy7N59049xBIdfujWFBHmA5fNgt_C1P64
	 *                  refreshToken:
	 *                    type: string
	 *                    description: User's refresh token to generate new access token.
	 *                    example: 95100f31-90d9-4173-9b4c-18980aa5499d
	 */
	app.post("/api/users/login", controller.login);

	/**
	 * @swagger
	 * /api/users/refreshToken:
	 *   post:
	 *     tags:
	 *       - User Management
	 *     summary: Generate new access token
	 *     description: Generate new access token using user's refresh token.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *                refreshToken:
	 *                  type: string
	 *                  description: Send out user's refresh token.
	 *                  example: 9ad656a6-4c90-4701-8cd1-2d65ff08a0ae
	 *     responses:
	 *       200:
	 *          description: Successfully logged in.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  accessToken:
	 *                    type: string
	 *                    description: New generated access token.
	 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5MjRiOTBjLTQ4MDUtNGY0Mi1hNGMxLWRhNWRkMjQzZWZmMiIsImlhdCI6MTY3ODMwOTE4NSwiZXhwIjoxNjc4MzEyNzg1fQ.QtXPJ4Xknj6JGDCzIvj92cZKmsu3206kJvXyi-Y-p30
	 *                  refreshToken:
	 *                    type: string
	 *                    description: User's refresh token.
	 *                    example: 9ad656a6-4c90-4701-8cd1-2d65ff08a0ae
	 *
	 */
	app.post("/api/users/refreshtoken", controller.refreshToken);

	/**
	 * @swagger
	 * /api/users:
	 *   post:
	 *     tags:
	 *       - User Management
	 *     summary: Create new user
	 *     description: Create new user. Must be user with SUPERADMIN role.
	 *     parameters:
	 *     - name: x-access-token
	 *       in: header
	 *       description: User's access token
	 *       required: true
	 *       type: string
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *                email:
	 *                  type: string
	 *                  description: New user's email.
	 *                  example: admin@mail.com
	 *                password:
	 *                  type: string
	 *                  description: New user's password.
	 *                  example: 123456
	 *                roles:
	 *                  type: string
	 *                  description: New user's role.
	 *                  example: admin
	 *     responses:
	 *       200:
	 *          description: User was created successfully.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: User was created successfully.
	 */
	app.post(
		"/api/users",
		[
			authJwt.verifyToken,
			verifySignUp.checkDuplicateEmail,
			verifySignUp.checkRolesExisted,
		],
		controller.create
	);

	/**
	 * @swagger
	 * /api/users/{id}:
	 *   delete:
	 *     tags:
	 *       - User Management
	 *     summary: Delete user
	 *     description: Delete user using user id.
	 *     parameters:
	 *     - name: id
	 *       in: path
	 *       description: User's access token
	 *       required: true
	 *       type: string
	 *     responses:
	 *       200:
	 *          description: User was deleted successfully.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: User was deleted successfully.
	 */
	app.delete("/api/users/:id", controller.delete);
};

