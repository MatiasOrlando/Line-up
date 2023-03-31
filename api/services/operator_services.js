const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");


const getAllAppointments = async (limit, id) => {
    try {
        const branchArray = await Branch.find({
          "user.id": id,
        });
    
        if (!branchArray[0].id) {
          return({ error: "operator branch does not exist" });
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
          const page = dataForOperator.splice(limit - 12, limit)
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


const editStatusOfAppointment = async (status, appointmentId, id) => {
  try {
    if (!status) {
      return({ error: "status data missing" });
    }

    if (status !== "pending" && status !== "completed") {
      return({ error: "status passed not valid" });
    }
    if (!appointmentId) {
      return({ error: "key info missing" });
    }
    const updatedState = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { status: status } },
      { new: true }
    );
    if (!updatedState) {
      return({ error: "appoinment does not exist" });
    }
    const branch = await Branch.findById(updatedState.sucursal.id);
    if(!branch.user){
        return({error: "branch of appointment does not exist"})
    }

    if (branch.user.id === id) {
      updatedState.save();
     return({status: 200});
    } else {
      return({status:401});
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = { getAllAppointments, editStatusOfAppointment }