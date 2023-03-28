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
	 *       401:
	 *         description: Invalid password. incorrect password.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                accessToken:
	 *                  type: 'null'
	 *                  description: User's access token to access API.
	 *                  example: null
	 *                message:
	 *                  type: string
	 *                  description: Result message.
	 *                  example: Invalid Password.
	 *       404:
	 *         description: User not found, incorrect email.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                message:
	 *                  type: string
	 *                  description: Result message.
	 *                  example: Email address is not registered. Check the email address again.
	 *       500:
	 *         description: Application error.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                message:
	 *                  type: string
	 *                  description: Application error.
	 *                  example: Failed to login. Please check application log.
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
	 *          description: Access token was generated successfully.
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
	 *       400:
	 *          description: Refresh token is invalid.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: Refresh token is not in database!
	 *       403:
	 *          description: Refresh token was expired.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: Refresh token was expired. Please make a new signin request
	 *       500:
	 *          description: Application Error.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Application Error.
	 *                    example: Failed to generate access token. Please check application log.
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
	 *       400:
	 *          description: Email already used.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: Failed! Email is already in use!
	 *       401:
	 *          description: Access token expired.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: Unauthorized! Access Token was expired!
	 *       403:
	 *          description: Token not provided.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: No token provided!
	 *       500:
	 *          description: Application Error.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Application Error.
	 *                    example: Failed to create user. Please check application log.
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
	 *       404:
	 *          description: User not found, incorrect id.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: User not found.
	 *       500:
	 *          description: Application Error.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Application Error.
	 *                    example: Failed to delete user. Please check application log.
	 */
	app.delete("/api/users/:id", controller.delete);

	/**
	 * @swagger
	 * /api/users:
	 *   get:
	 *     tags:
	 *       - User Management
	 *     summary: Get all user accounts.
	 *     description: Get all user accounts.
	 *     responses:
	 *       200:
	 *          description: Users successfully fetched.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: Users was fetched successfully.
	 *                  data:
	 *                    type: array
	 *                    items:
	 *                      type: object
	 *                      properties:
	 *                        id:
	 *                          type: string
	 *                          example: e9c03ec2-3cf3-4bec-9d72-85fad5e4a06b
	 *                        email:
	 *                          type: string
	 *                          example: superadmin@mail.com
	 *                        password:
	 *                          type: string
	 *                          example: $2a$08$BWDAcdpTIZ/Yuy33vXZld.QWx4kv8t.JHBSvEI3fWLngVHIM5n/Ma
	 *                        createdAt:
	 *                          type: string
	 *                          example: 2023-03-19T14:07:50.893Z
	 *                        updatedAt:
	 *                          type: string
	 *                          example: 2023-03-19T14:07:50.893Z
	 *       404:
	 *         description: User not found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                message:
	 *                  type: string
	 *                  description: Result message.
	 *                  example: User not found.
	 *       500:
	 *         description: Application error.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                message:
	 *                  type: string
	 *                  description: Application error.
	 *                  example: Failed to fetch users. Please check application log.
	 */
	app.get("/api/users", controller.getAll);

	/**
	 * @swagger
	 * /api/users/{id}:
	 *   put:
	 *     tags:
	 *       - User Management
	 *     summary: Update user
	 *     description: Update user using user id.
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
	 *                  example: admin12@mail.com
	 *                password:
	 *                  type: string
	 *                  description: The user's password.
	 *                  example: 111222333
	 *     parameters:
	 *     - name: id
	 *       in: path
	 *       description: User's id
	 *       required: true
	 *       type: string
	 *     responses:
	 *       200:
	 *          description: User was updated successfully.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: User was updated successfully.
	 *       404:
	 *          description: User not found, incorrect id.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Result message.
	 *                    example: User not found.
	 *       500:
	 *          description: Application Error.
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: string
	 *                    description: Application Error.
	 *                    example: Failed to update user. Please check application log.
	 */
	app.put("/api/users/:id", controller.update);
};

