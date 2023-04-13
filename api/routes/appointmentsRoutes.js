const router = require("express").Router();
const Appointment = require("../models/appointment");

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
router.get("/:id", async (req, res) => {
  try {
    const idUser = "6422b1e34da6f9b3f79ba531";
    /* const userAppointments = await Appointment.find({
      "user.id": idUser,
    }); */
    const userAppointments = await Appointment.find({});
    return res.status(200).send(userAppointments);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
