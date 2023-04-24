const router = require("express").Router();
const appointmentsController = require("../controllers/appointments_controller");

/**
 * @openapi
 * /api/appointments/add:
 *   post:
 *     tags:
 *       - appointments
 *     summary: Create a new Appoinment 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddnewAppoinment'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddnewAppoinment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */

/**
 * @openapi
 * /api/appointments/branches:
 *   get:
 *     tags:
 *       - appointments
 *     summary: Get all branches 
 *     responses:
 *       200:
 *         description: (OK) FOUND
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */


/**
 * @openapi
 * /api/appointments/daysavailable:
 *   post:
 *     tags:
 *       - appointments
 *     summary: Get days available based on the branche selected
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetdayAvailable'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetdayAvailable'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */

/**
 * @openapi
 * /api/appointments/hoursavailable:
 *   post:
 *     tags:
 *       - appointments
 *     summary: Get hours available based on the day and branch selected
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetHoursAvailable'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetHoursAvailable'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */

/**
 * @openapi
 * /api/appointments/edit:
 *   put:
 *     tags:
 *       - appointments
 *     summary: Edit Appoinments the user previously took
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditAppoinment'
 *       required: true
 *     responses:
 *       201:
 *         description: (OK) Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditAppoinment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 *       NotFound:
 *         description: (NotFound) No se encontró información
 */


/**
 * @openapi
 * /api/appointments/cancel/{idApp}/token:
 *   put:
 *     tags:
 *       - appointments
 *     summary: Cancel an appoinment that you previously took.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: idApp
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CancelAppoinment'
 *       required: true
 *     responses:
 *       200:
 *         description: (OK) Modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CancelAppoinment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/appointments/lastAppointment/token:
 *   get:
 *     tags:
 *       - appointments
 *     summary: Get last appoinment of the user.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User Unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/appointments/{idApp}/token:
 *   get:
 *     tags:
 *       - appointments
 *     summary: Get User appoinment by idApp.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: idApp
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User Unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */

/**
 * @openapi
 * /api/appointments/user-appointments:
 *   get:
 *     tags:
 *       - appointments
 *     summary: Get all users Appoinments by decoding the user with the token.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     responses:
 *       200:
 *         description: (OK) OK
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: (NotFound) No se encontró información
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   components:
 *     securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         name: token
 *         in: query
 *     responses:
 *       Unauthorized:
 *         description: (Unauthorized) User Unauthorized
 *       NotFound:
 *         description: (NotFound) No se encontró información
 *       BadRequest:
 *         description: (Bad Request) key data is missing
 *       ServerError:
 *         description: Error en servidor
 */






router.post("/add", appointmentsController.createAppointment);
router.get("/branches", appointmentsController.getAllBranchs);
router.post("/daysavailable", appointmentsController.getDaysAvailable);
router.post("/hoursavailable", appointmentsController.getHoursAvailable);
router.put("/edit", appointmentsController.editAppointment);
router.put("/cancel/:idApp/token", appointmentsController.cancelAppointment);
router.get("/lastAppointment/token", appointmentsController.getUserLastAppointment);
router.get("/:idApp/token", appointmentsController.getUserAppointmentById);
router.get("/user-appointments/:number", appointmentsController.getAllUserAppointmentsById);

/* router.get("/user-appointments/:number", async(req,res)=>{
    const number = req.params.number;
    const limit = number * 7;
}); */




module.exports = router;
