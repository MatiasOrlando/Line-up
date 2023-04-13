const router = require("express").Router();
const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const { DateTime } = require("luxon");
const moment = require("moment");
const { appointmentConfirmation } = require("../config/emailConfirmation");
const { validateToken } = require("../config/token");
const appointmentsController = require("../controllers/appointments_controller");

router.post("/add", appointmentsController.createAppointment);
// router.post("/add", async (req, res) => {
//   const { branch, name, email, phoneNew, day, time } = req.body;
//   const lastAppointment = await Appointment.findOne().sort({ _id: -1 });
//   try {
//     const selectedBranch = await Branch.find({ name: branch });
//     const allowedClients = selectedBranch[0].allowedClients;
//     const openingHour = selectedBranch[0].openingHour;
//     const closingHour = selectedBranch[0].closingHour;
//     const user = await User.findOne({ email });
//     const fullAppoinment = await Appointment.find({
//       date: day,
//       timeOfAppoinment: time,
//       "sucursal.name": branch,
//     });
//     if (fullAppoinment.length < allowedClients) {
//       let turno = {
//         date: day,
//         timeOfAppoinment: time,
//         idApp: lastAppointment.idApp + 1,
//         user: {
//           id: user._id,
//           name: name,
//           email: email,
//           phone: phoneNew,
//         },
//         sucursal: {
//           id: selectedBranch[0]._id,
//           name: branch,
//           allowedClients: allowedClients,
//           openingHour: openingHour,
//           closingHour: closingHour,
//         },
//       };
//       await Appointment.create(turno);
//       if (user?.phone) {
//         if (user.phone !== phoneNew) {
//           await User.updateOne({ email: email }, { phone: phoneNew });
//         }

//         res.status(201).send(turno);
//       }
//     } else {
//       res.send("Turnos completos en el horario solicitado");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/branches", appointmentsController.getAllBranchs);
// router.get("/branches", async (req, res) => {
//   try {
//     const names = [];
//     const branchesNames = await Branch.find({});
//     branchesNames.map((branch) => {
//       return names.push(branch.name);
//     });
//     return res.status(200).send(names);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/daysavailable", appointmentsController.getDaysAvailable);

// router.post("/daysavailable", async (req, res) => {
//   const { days, branch, email } = req.body;
//   const userAppointments = await Appointment.find({
//     "user.email": email,
//   });
//   const turnos = userAppointments.map((turno) => {
//     return turno.date;
//   });

//   try {
//     const selectedBranch = await Branch.find({ name: branch });
//     const { openingHour, closingHour, allowedClients } = selectedBranch[0];
//     const timeNow = DateTime.local();
//     const openingTime = DateTime.fromFormat(openingHour, "HH:mm");
//     const closingTime = DateTime.fromFormat(closingHour, "HH:mm");
//     const hoursOpen = closingTime.diff(openingTime, "hours").hours;
//     const twoHoursWindow = closingTime.diff(timeNow, "hours").hours;

//     const formattedDayNow = timeNow.toFormat("dd-MM-yyyy");
//     const appoinmentsPerDay = hoursOpen * 4 * allowedClients;
//     const arrayToSend = [];

//     const promises = days.map(async (day) => {
//       const availableAppoinments = await Appointment.find({ date: day });
//       if (day !== formattedDayNow || twoHoursWindow > 2) {
//         if (availableAppoinments.length < appoinmentsPerDay) {
//           return arrayToSend.push({
//             day,
//             availables: appoinmentsPerDay - availableAppoinments.length,
//           });
//         }
//       }
//     });

//     await Promise.all(promises);
//     return res.status(200).send({
//       arrayToSend,
//       turnos,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/hoursavailable", appointmentsController.getHoursAvailable);
// router.post("/hoursavailable", async (req, res) => {
//   const { day, branch } = req.body;
//   try {
//     const fechaSeleccionada = day;
//     const selectedBranch = await Branch.find({ name: branch });
//     const allowedClients = selectedBranch[0].allowedClients;
//     const openingHour = selectedBranch[0].openingHour;
//     const closingHour = selectedBranch[0].closingHour;
//     const openingTime = moment(openingHour, "HH:mm");
//     const closingTime = moment(closingHour, "HH:mm");
//     const duration = moment.duration(closingTime.diff(openingTime));
//     const numIntervals = Math.ceil(duration.asMinutes() / 15);
//     const timeNow = DateTime.local();
//     const horarios = {};
//     for (let i = 0; i < numIntervals; i++) {
//       const start = openingTime.clone().add(i * 15, "minutes");
//       const horario = start.format("HH:mm");
//       horarios[horario] = { horario: horario, count: 0 };
//     }

//     const appointments = await Appointment.aggregate([
//       {
//         $match: { date: fechaSeleccionada, "sucursal.name": branch },
//       },
//       {
//         $match: { status: { $ne: "Cancel" } },
//       },
//       {
//         $group: {
//           _id: "$timeOfAppoinment",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     appointments.forEach((appointment) => {
//       const horario = appointment._id;
//       const count = appointment.count;
//       if (horarios.hasOwnProperty(horario)) {
//         horarios[horario].count = count;
//       }
//     });

//     const resultados = Object.values(horarios);
//     const horariosFiltrados = [];
//     resultados.map((resultado) => {
//       if (resultado.count < allowedClients) {
//         horariosFiltrados.push(resultado.horario);
//       }
//     });
//     const horariosDisponibles = [];
//     horariosFiltrados.forEach((horario) => {
//       const horarioFormat = DateTime.fromFormat(horario, "HH:mm");
//       if (
//         fechaSeleccionada === timeNow.toFormat("dd-MM-yyyy") &&
//         horarioFormat.diff(timeNow, "hours").hours > 2
//       ) {
//         return horariosDisponibles.push(horario);
//       }
//       if (fechaSeleccionada !== timeNow.toFormat("dd-MM-yyyy")) {
//         return horariosDisponibles.push(horario);
//       }
//     });
//     return res.status(200).send(horariosDisponibles);
//   } catch (error) {
//     console.log(error);
//   }
// });

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

router.put("/edit", appointmentsController.editAppointment);
// router.put("/edit", async (req, res) => {
//   const { idApp, day, time, branch, phoneNew } = req.body;
//   const branchData = await Branch.find({ name: branch });
//   const sucursal = {
//     id: branchData[0].id,
//     name: branchData[0].name,
//     location: branchData[0].name,
//     openingHour: branchData[0].openingHour,
//     closingHour: branchData[0].closingHour,
//     allowedClients: branchData[0].allowedClients,
//   };
//   try {
//     const appointmentUpdate = await Appointment.findOne({ idApp });
//     appointmentUpdate.date = day;
//     appointmentUpdate.timeOfAppoinment = time;
//     appointmentUpdate.sucursal = sucursal;
//     appointmentUpdate.save();
//     return res.send(appointmentUpdate);
//   } catch (error) {
//     console.error(error);
//   }
// });

// cancelar

router.put("/cancel/:idApp/token", appointmentsController.cancelAppointment);
// router.put("/cancel/:idApp/token", async (req, res) => {
//   // Recibimos por params idApp y por body la razon de la cancelacion. Actualizamos status..
//   const { token } = req.query;
//   const decodedUser = validateToken(token);
//   const idApp = req.params.idApp;
//   const cancelReason = req.body.cancelReason;
//   try {
//     if (decodedUser) {
//       const canceledAppointment = await Appointment.findOne({ idApp: idApp });
//       canceledAppointment.cancelReason = cancelReason;
//       canceledAppointment.status = "Cancel";
//       await canceledAppointment.save();
//       return res.status(200).send(canceledAppointment);
//     } else {
//       return res.status(400).send("Usuario no encontrado");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// buscar el ultimo turno
router.get(
  "/lastAppointment/token",
  appointmentsController.getUserLastAppointment
);
// router.get("/lastAppointment/token", async (req, res) => {
//   try {
//     const { token } = req.query;
//     const decodedUser = validateToken(token);
//     if (decodedUser) {
//       const userAppointment = await Appointment.find({
//         "user.id": decodedUser._id,
//       })
//         .sort({ _id: -1 })
//         .limit(1);

//       const testEmailUser = await appointmentConfirmation(userAppointment);
//       if (testEmailUser) {
//         return res.status(401).send(`Invalid email`);
//       }
//       return res.status(200).send(userAppointment);
//     } else {
//       return res.status(400).send(`Invalid credentials`);
//     }
//   } catch (error) {
//     return res.status(500).send(`Server error`);
//   }
// });

router.get("/:idApp/token", appointmentsController.getUserAppointmentById);
// router.get("/:idApp/token", async (req, res) => {
//   try {
//     const idApp = req.params.idApp;
//     const { token } = req.query;
//     const decodedUser = validateToken(token);
//     if (decodedUser) {
//       const userAppointment = await Appointment.find({ idApp: idApp });
//       return res.status(200).send(userAppointment);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });
module.exports = router;
