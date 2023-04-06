const router = require("express").Router();
const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const { DateTime } = require("luxon");
const moment = require("moment");

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

router.get("/branches", async (req, res) => {
  try {
    const names = [];
    const branchesNames = await Branch.find({});
    branchesNames.map((branch) => {
      return names.push(branch.name);
    });
    return res.status(200).send(names);
  } catch (error) {
    console.log(error);
  }
});

router.get("/daysavailable", async (req, res) => {
  const { days, branch } = req.body;

  try {
    const selectedBranch = await Branch.find({ name: branch });
    const { openingHour, closingHour, allowedClients } = selectedBranch[0];
    const openingTime = DateTime.fromFormat(openingHour, "HH:mm");
    const closingTime = DateTime.fromFormat(closingHour, "HH:mm");
    const hoursOpen = closingTime.diff(openingTime, "hours").hours;
    const appoinmentsPerDay = hoursOpen * 4 * allowedClients;
    const arrayToSend = [];
    const promises = days.map(async (day) => {
      const availableAppoinments = await Appointment.find({ date: day });
      if (availableAppoinments.length < appoinmentsPerDay) {
        arrayToSend.push(day);
      }
    });

    await Promise.all(promises);

    return res.status(200).send(arrayToSend);
  } catch (error) {
    console.log(error);
  }
});

router.get("/hoursavailable", async (req, res) => {
  const { day, branch } = req.body;
  try {
    const fechaSeleccionada = day; // Reemplaza esto con tu fecha seleccionada
    const selectedBranch = await Branch.find({ name: branch });
    const { openingHour, closingHour, allowedClients } = selectedBranch[0];
    const openingTime = moment(openingHour, "HH:mm");
    const closingTime = moment(closingHour, "HH:mm");
    const duration = moment.duration(closingTime.diff(openingTime));
    const numIntervals = Math.ceil(duration.asMinutes() / 15);

    const horarios = {};
    for (let i = 0; i < numIntervals; i++) {
      const start = openingTime.clone().add(i * 15, "minutes");
      const horario = start.format("HH:mm");
      horarios[horario] = { horario: horario, count: 0 };
    }

    const appointments = await Appointment.aggregate([
      {
        $match: { fecha: fechaSeleccionada },
      },
      {
        $group: {
          _id: "$horario",
          count: { $sum: 1 },
        },
      },
    ]);

    appointments.forEach((appointment) => {
      const horario = appointment._id;
      const count = appointment.count;
      if (horarios.hasOwnProperty(horario)) {
        horarios[horario].count = count;
      }
    });

    const resultados = Object.values(horarios);
    const horariosDisponibles = [];
    resultados.map((resultado) => {
      if (resultado.count < allowedClients) {
        horariosDisponibles.push(resultado.horario);
      }
    });
    res.status(200).send(horariosDisponibles);
  } catch (error) {
    console.log(error);
  }
});

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
