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
}

module.exports = AppointmentsService;
