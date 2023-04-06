const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");



class operator_services {
  static async getAllAppointments(limit, email) {
    try {
        const branchArray = await Branch.find({"user.email": email ,});
        const branchId = branchArray[0].id;
        const appointmentsOfBranchArray = await Appointment.find({"sucursal.id": branchId,});
        const dataForOperator = appointmentsOfBranchArray.map((item) => { return { date: item.date, timeOfAppontment: item.timeOfAppontment, status: item.status, sucursal: item.sucursal.location, user: item.user.name, id: item.id } });
        const page = dataForOperator.splice(limit - 7, limit);
        return({error: false, data: page, length: appointmentsOfBranchArray.length});
      } catch (err) {
        return({error: true, data: err})
      }
}



static async editStatusOfAppointment(status, appointmentId, _id) {
  try {
    const updatedState = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { status: status } },
      { new: true });
    const branch = await Branch.findById(updatedState.sucursal.id);
    if (branch.user.id == _id) {
      updatedState.save();
     return({error: false, data: updatedState});
    } else {
      return({error: true, data: updatedState});
    }
  } catch (err) {
    return({error: true, data: err})
  }
}

}


module.exports = { operator_services }
