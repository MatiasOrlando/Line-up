const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const operatorController = require("../controllers/operator_controller")
const validateMiddleware = require("../middleWare/validateMiddleware").isOperator;



router.get("/:id/appointments/:numberOfPages", validateMiddleware, operatorController.get_all_appointments_get);


router.put("/:id/:appointmentId",validateMiddleware, operatorController.edit_status_of_appointment
);

module.exports = router;