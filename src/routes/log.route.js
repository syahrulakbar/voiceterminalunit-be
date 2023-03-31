const controller = require("../controllers/log.controller.js");

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
   * /api/logs:
   *   get:
   *     tags:
   *       - Device Status Logs
   *     summary: Fetch logs
   *     description: Fetch logs.
   *     responses:
   *       200:
   *          description: Logs was fetched successfully.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  datetime:
   *                    type: date
   *                    description: Memory (RAM) usage in %.
   *                    example:
   *                  status:
   *                    type: string
   *                    description: status
   *                    example: {''}
   */
  app.get("/api/logs", controller.fetchAll);
};
