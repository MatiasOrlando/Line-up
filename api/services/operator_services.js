const Branch = require("../models/branch");
const Appointment = require("../models/appointment");

class operator_services {
  static async getAllAppointments(limit, email) {
    try {
      const branchArray = await Branch.find({ "user.email": email });
      if (branchArray.length < 1) {
        return { error: false, data: [], length: 0 };
      }
      const branchId = branchArray[0].id;
      const appointmentsOfBranchArray = await Appointment.find({
        "sucursal.id": branchId,
      });
      const dataForOperator = appointmentsOfBranchArray.map((item) => {
        return {
          date: item.date,
          timeOfAppontment: item.timeOfAppoinment,
          status: item.status,
          sucursal: item.sucursal.name,
          user: item.user.name,
          id: item.id,
          idApp: item.idApp,
          createdAt: item.createdAt,
        };
      });
      const page = dataForOperator.splice(limit - 7, limit);
      return {
        error: false,
        data: page,
        length: appointmentsOfBranchArray.length,
      };
    } catch (err) {
      return { error: true, data: err };
    }
  }

  static async editStatusOfAppointment(status, appointmentId, _id) {
    try {
      const updatedState = await Appointment.findOneAndUpdate(
        { _id: appointmentId },
        { $set: { status: status } },
        { new: true }
      );
      const branch = await Branch.findById(updatedState.sucursal.id);
      if (branch.user.id == _id) {
        updatedState.save();
        return { error: false, data: updatedState };
      } else {
        return { error: true, data: updatedState };
      }
    } catch (err) {
      return { error: true, data: err };
    }
  }
}

module.exports = { operator_services };
