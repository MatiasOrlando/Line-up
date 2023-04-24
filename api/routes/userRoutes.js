const router = require("express").Router();
const userControllers = require("../controllers/user_controller");

/**
 *  @openapi
 *  /api/user/register:
 *    post:
 *      tags:
 *        - users
 *      summary: Create new user on the db
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userRegisterPost'
 *        required: true
 *      responses:
 *        201:
 *          description: (OK) User created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userRegisterPost'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *   responses:
 *     BadRequest:
 *       description: (Bad Request) Invalid data
 *     ServerError:
 *       description: (ServerError) Server Error
 */
router.post("/register", userControllers.registerUser);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Log in user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userLogIn'
 *       required: true
 *     responses:
 *       200:
 *         description: (OK) Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userLogIn'
 *       401:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * components:
 *   responses:
 *     ServerError:
 *       description: (ServerError) Server Error
 *     BadRequest:
 *       description: (Bad Request) Invalid credentials
 *     UserNotFound:
 *       description: (UserNotFound) User not found
 */
router.post("/login", userControllers.logIn);

/**
 * @openapi
 * /api/user/all-users:
 *    get:
 *      tags:
 *        - users
 *      summary: Get all users from DB
 *      parameters:
 *        - in: query
 *          name: allUsers
 *          description: Returns all registered users
 *      responses:
 *        200:
 *          description: (OK) All users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *    responses:
 *      Unauthorized:
 *        description: (Unauthorized) User unathorized
 *      ServerError:
 *        description: (ServerError) Server Error
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          dni:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          phone:
 *            type: integer
 *          admin:
 *            type: boolean
 *          operator:
 *            type: boolean
 */
router.get("/all-users", userControllers.getAllUsers);

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get single user
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Returns a single user
 *     responses:
 *       200:
 *         description: (OK) User ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       BadRequest:
 *         description: (BadRequest) Invalid credentials
 *       ServerError:
 *         description: (Server Error) Server Error
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *           dni:
 *             type: string
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           phone:
 *             type: integer
 *           admin:
 *             type: boolean
 *           operator:
 *             type: boolean
 */
router.get("/:id", userControllers.getSingleUser);

/**
 * @openapi
 * /api/user/new-password:
 *   put:
 *     tags:
 *       - users
 *     summary: Update user's password
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     responses:
 *       200:
 *         description: (OK) Password successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PasswordUpdate'
 *       404:
 *         $ref: '#/components/responses/BadRequest'
 *       400:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: requestBody
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized, invalid credentials
 *       BadRequest:
 *         description: (Bad Request) Bad request
 *       ServerError:
 *         description: Server Error
 */
router.put("/new-password", userControllers.newPassword);

/**
 * @openapi
 * /api/user/password-update-email:
 *   put:
 *     tags:
 *       - users
 *     summary: Validates email provided by user in order to send an email and update his password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailValidation'
 *     responses:
 *       200:
 *         description: (OK) Email sent to update password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailValidation'
 *       400:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) Invalid email
 *       ServerError:
 *         description: Server Error
 */
router.put("/password-update-email", userControllers.passwordEmailUpdate);

/**
 * @openapi
 * /api/user/validate/token:
 *   get:
 *     tags:
 *       - users
 *     summary: Validates user token to retrieve his personal data
 *     parameters:
 *       - name: token
 *         in: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Validates user token and returns user decrypted
 *     responses:
 *       200:
 *         description: (OK) The token corresponds to a valid user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) Invalid token
 *       ServerError:
 *         description: (ServerError) Server error
 *
 */
router.get("/validate/token", userControllers.validateUserdata);

module.exports = router;
