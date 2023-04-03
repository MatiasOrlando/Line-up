const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const operatorController = require("../controllers/operator_controller")
const validateMiddleware = require("../middleWare/validateMiddleware").isOperator;


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