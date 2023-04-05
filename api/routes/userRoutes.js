const router = require("express").Router();
const { emailConfirmation } = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");
const { validateToken } = require("../config/token");
const userControllers = require("../controllers/user_controller");

/**
 * @openapi
 * /api/user/register:
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
 *          description: (OK) Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userRegisterPost'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.post("/register", userControllers.registerUser);

router.get("/all-users", userControllers.getAllUsers);
router.post("/login", userControllers.logIn);
router.get("/:id", userControllers.getSingleUser);
router.put("/new-password-email", userControllers.newPasswordEmail);
router.put("/new-password-profile", userControllers.newPasswordProfile);
router.put("/password-update-email", userControllers.passwordEmailUpdate);
router.get("/email/token", userControllers.validateUserdata);

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});

module.exports = router;
