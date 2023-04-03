const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const validateMiddleware = require("../config/validateMiddleware").isOperator;
const operatorController = require("../controllers/operator_controller")

router.get("/:id/appointments/:numberOfPages", validateMiddleware, operatorController.get_all_appointments_get);


router.put("/:id/:appointmentId",validateMiddleware, operatorController.edit_status_of_appointment
);

module.exports = router;