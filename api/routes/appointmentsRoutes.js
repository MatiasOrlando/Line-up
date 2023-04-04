const router = require("express").Router();
const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");

router.post("/add", async (req, res) => {
  const idUser = "6421daa054ed9950496a68b3";
  const idBranch = "6421daa154ed9950496a68f4";
  const dateNumber = "2023-10-67742";
  try {
    const userFound = await User.findById(idUser).exec();
    const selectedBranch = await Branch.findById(idBranch).exec();
    const userAppointments = await Appointment.find({
      "user.id": userFound.id,
    });
    const arrayAppointmentsDate = userAppointments.filter((appointment) => {
      return appointment.date == dateNumber;
    });
    if (arrayAppointmentsDate.length) {
      return res.status(404).send(`No puede reservar mas de un turno por dia`);
    } else {
      const newAppointment = await Appointment.create({
        date: dateNumber,
        timeOfAppontment: "10:30",
        status: "pending",
        user: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          phone: userFound.phone,
        },
        sucursal: {
          id: selectedBranch.id,
          location: selectedBranch.location,
          allowedClients: selectedBranch.allowedClients,
          hourRange: selectedBranch.hourRange,
        },
      });
      newAppointment.save();
      return res.send(newAppointment);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/branches", async (req,res) => {
  try {
    const names = []
    const branchesNames = await Branch.find({});
    branchesNames.map(branch => {
     return names.push(branch.name)
    })
    return res.status(200).send(names)
  } catch (error) {
    console.log(error);
  }
});

router.get('/daysavailable', async (req, res) => {
})

router.get("/:id", async (req, res) => {
  // Recibo por params idUsuario y busco en coleccion apppointments todas las que coincidan con el userId recibido
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

router.put("/", async (req, res) => {
  // Recibo por body/params idAppointment, newDate, newTime,y Name de la newBranch y updateo en coleccion apppointments con el id correspondiente
  const idAppointment = "6421daa154ed9950496a692f";
  const date = "2024-02-67742";
  const timeOfAppontment = "09:58";
  const branchData = await Branch.find({ name: "Sydney SUCURSAL" });
  const sucursal = {
    id: branchData[0].id,
    location: branchData[0].location,
    hourRange: branchData[0].hourRange,
    allowedClients: branchData[0].allowedClients,
  };
  try {
    const appointmentUpdate = await Appointment.findById(idAppointment);
    appointmentUpdate.date = date;
    appointmentUpdate.timeOfAppontment = timeOfAppontment;
    appointmentUpdate.sucursal = sucursal;
    appointmentUpdate.save();
    return res.send(appointmentUpdate);
  } catch (error) {
    console.error(error);
  }
});

router.put("/cancelar/:reservaId", async (req, res) => {
  // Recibimos por params id Appointment y por body la reason de la cancelacion. Actualizamos status..
  const id = "6421daa154ed9950496a6933";
  const cancelReason = "Me quede dormido";
  try {
    const canceledAppointment = await Appointment.findById(id);
    canceledAppointment.cancelReason = cancelReason;
    canceledAppointment.status = "Cancel";
    canceledAppointment.save();
    return res.send(canceledAppointment);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
