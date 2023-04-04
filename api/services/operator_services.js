const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");



class operator_services {
  static async getAllAppointments(limit, _id) {
    try {
        const branchArray = await Branch.find({
          "user.id": _id ,
        });
        if (!branchArray[0]) {
          return({ error: true, data: branchArray });
        }
        const branchId = branchArray[0].id;
        const appointmentsOfBranchArray = await Appointment.find({
          "sucursal.id": branchId,
        });
        if (!appointmentsOfBranchArray[0]) {
          return({ error: "appointments of operator branch does not exist" });
        }
        const dataForOperator = appointmentsOfBranchArray.map((item) => { return { date: item.date, timeOfAppontment: item.timeOfAppontment, status: item.status, sucursal: item.sucursal.location, user: item.user.name, id: item.id } })
        if (dataForOperator[0]) {
          const page = dataForOperator.splice(limit - 7, limit)
          if (!page[0].sucursal) {
            return({ error: "Page selected is empty" })
          }
          return(page);
        } else {
          return({ error: "Not appointments to be sent" })
        }
      } catch (err) {
        console.log(err)
      }
}


static async editStatusOfAppointment(status, appointmentId, _id) {
  try {
   if (status !== "pending" && status !== "completed") {
      return({ error: "status passed not valid" });
    }
    const updatedState = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { status: status } },
      { new: true }
    );
    if (!updatedState) {
      return({ error: true, data: updatedState });
    }
    const branch = await Branch.findById(updatedState.sucursal.id);
    if(!branch.user){
        return({error:true , data: branch})
    }
    if (branch.user.id == _id) {
      updatedState.save();
     return({error: false, data: updatedState});
    } else {
      return({error: true, data: updatedState});
    }
  } catch (err) {
    console.log(err);
  }
}

}


module.exports = { operator_services }