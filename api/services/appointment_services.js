const Appointment = require("../models/appointment");

class AppointmentsService {
  static async findLastAppointment() {
    try {
      const lastAppointment = await Appointment.findOne().sort({ _id: -1 });
      return { error: false, data: lastAppointment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async validationAvailabilityAppointment(day, time) {
    try {
      const fullAppoinment = await Appointment.find({
        day: day,
        timeOfAppoinment: time,
      });
      return { error: false, data: fullAppoinment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async createAppointment(appointment) {
    try {
      const newAppointment = await Appointment.create(appointment);
      return { error: false, data: newAppointment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAllUserAppointments(email) {
    try {
      const userAppointments = await Appointment.find({
        "user.email": email,
      });
      return { error: false, data: userAppointments };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAvailableAppointments(day) {
    try {
      const checkAvailableAppointment = await Appointment.find({ date: day });
      return { error: false, data: checkAvailableAppointment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async appointmentCounterSelectedDayInBranch(selectedDate, branchName) {
    try {
      const appointments = await Appointment.aggregate([
        {
          $match: { date: selectedDate, "sucursal.name": branchName },
        },
        {
          $match: { status: { $ne: "Cancel" } },
        },
        {
          $group: {
            _id: "$timeOfAppoinment",
            count: { $sum: 1 },
          },
        },
      ]);
      return { error: false, data: appointments };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async findOneAndEditAppointment(idApp, day, time, sucursal) {
    try {
      const appointmentByIdApp = await Appointment.findOne({ idApp });
      appointmentByIdApp.date = day;
      appointmentByIdApp.timeOfAppoinment = time;
      appointmentByIdApp.sucursal = sucursal;
      appointmentByIdApp.save();
      return { error: false, data: appointmentByIdApp };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async findOneAndCancelAppointment(idApp, cancelReason) {
    try {
      const canceledAppointment = await Appointment.findOne({ idApp });
      canceledAppointment.cancelReason = cancelReason;
      canceledAppointment.status = "Cancel";
      await canceledAppointment.save();
      return { error: false, data: canceledAppointment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getUserLastAppointment(id) {
    try {
      const userLastAppointment = await Appointment.find({
        "user.id": id,
      })
        .sort({ _id: -1 })
        .limit(1);
      return { error: false, data: userLastAppointment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getUserAppointmentById(idApp) {
    try {
      const userAppointmentById = await Appointment.find({ idApp });
      return { error: false, data: userAppointmentById };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAllUserAppointmentsById(id) {
    try {
      const getAllUserAppointmentsById = await Appointment.find({
        "user.id": id,
      });
      return { error: false, data: getAllUserAppointmentsById };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = AppointmentsService;
