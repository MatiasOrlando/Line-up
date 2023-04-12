const AppointmentsService = require("../services/appointment_services");
const BranchsService = require("../services/branch_services");
const UsersService = require("../services/user_services");

const createAppointment = async (req, res) => {
  const { branch, name, email, phoneNew, day, time } = req.body;
  const lastAppointment = await AppointmentsService.findLastAppointment();
  try {
    const selectedBranch = await BranchsService.getSingleBranch(branch);
    const { allowedClients, openingHour, closingHour } = selectedBranch.data[0];
    const user = await UsersService.searchUserByEmail(email);
    const fullAppointment =
      await AppointmentsService.validationAvailabilityAppointment(day, time);
    if (fullAppointment.data.length < allowedClients) {
      let appointment = {
        date: day,
        timeOfAppoinment: time,
        idApp: lastAppointment.data.idApp + 1,
        user: {
          id: user.data._id,
          name: name,
          email: email,
          phone: phoneNew,
        },
        sucursal: {
          id: selectedBranch.data[0]._id,
          name: branch,
          allowedClients: allowedClients,
          openingHour: openingHour,
          closingHour: closingHour,
        },
      };
      const newAppointment = AppointmentsService.createAppointment(appointment);
      if (user.data?.phone) {
        if (user.data.phone !== phoneNew) {
          await UsersService.updateUserPhone(email, phoneNew);
        }
        res.status(201).send(newAppointment.data);
      } else {
        res.status(400).send("Turnos completos en el horario solicitado");
      }
    }
  } catch (error) {
    res.status(500).send("No es posible reservar un turno en este momento");
  }
};

module.exports = { createAppointment };
