const router = require("express").Router();
const appointmentsController = require("../controllers/appointments_controller");

router.post("/add", appointmentsController.createAppointment);
router.get("/branches", appointmentsController.getAllBranchs);
router.post("/daysavailable", appointmentsController.getDaysAvailable);
router.post("/hoursavailable", appointmentsController.getHoursAvailable);
router.put("/edit", appointmentsController.editAppointment);
router.put("/cancel/:idApp/token", appointmentsController.cancelAppointment);
router.get(
  "/lastAppointment/token",
  appointmentsController.getUserLastAppointment
);
router.get("/:idApp/token", appointmentsController.getUserAppointmentById);
router.get(
  "/user-appointments",
  appointmentsController.getAllUserAppointmentsById
);

module.exports = router;
