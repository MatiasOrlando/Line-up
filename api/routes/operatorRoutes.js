const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const operatorController = require("../controllers/operator_controller")
const validateMiddleware = require("../middleWare/validateMiddleware").isOperator;

/**
 * @openapi
 * /api/operator/appointment/{numberOfPages}:
 *   get:
 *     tags:
 *       - appointments - operator 
 *     summary: get all appointments of a branch
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: numberOfPages
 *         in: path
 *         schema: 
 *           type: number
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
 *         $ref: '#/components/responses/NotFound'
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
 * /api/operator/appointment/{appointmentId}:
 *   put:
 *     tags:
 *        - appointments - operator 
 *     summary: edit status of an appointment
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: appointmentId
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
 *             $ref: '#/components/schemas/editStatusOfAppointment'
 *       required: true
 *     responses:
 *       200:
 *         description: (OK) Modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editStatusOfAppointment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
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

//  const id = req.params.id
//const number = req.params.numberOfPages
//const limit = number * 7
// TRAE TODOS LOS TURNOS DE LA SUCURSAL DEL OPERADOR, SEGUN LA PAGINA QUE LE PASES COMO PARAMS, 1 = 1 -7  /  2 = 7 - 14, 
router.get("/appointment/:numberOfPages", validateMiddleware, operatorController.get_all_appointments_get);

//  const status = req.body.status;
//const {appointmentId, id} = req.params
// MODIFICA EL STATUS DEL TURNO A PENDING O COMPLETED, LE PASAS EL APPOINTMENT ID POR PARMAS Y LO BUSCA Y MODIFICA
router.put("/appointment/:appointmentId",validateMiddleware, operatorController.edit_status_of_appointment
);

module.exports = router;