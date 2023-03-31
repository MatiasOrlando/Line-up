const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const operator_services = require("../services/operator_services")




exports.get_all_appointments_get = async (req, res, next) => {
  try {
    if (!req.params.numberOfPages || !req.params.id) {
      return res.status(400).send("key data is missing")
    }
    const id = req.params.id
    const number = req.params.numberOfPages
    const limit = number * 12
    const pageOfAppointments = await operator_services.getAllAppointments(limit, id)
    if(!pageOfAppointments[0].sucursal){
      return res.status(404).send({message: "unknown error"})
    }
    return res.status(200).send(pageOfAppointments)
  } catch (err) {
    console.log(err);
  }
}


exports.edit_status_of_appointment = async (req, res, next) => {
  const status = req.body.status;
  const {appointmentId, id} = req.params
  try{
   const stateOfUpdate = await operator_services.editStatusOfAppointment(status, appointmentId, id)
   if(stateOfUpdate.status === 200){
    return res.status(200).send({message: "succesfully updated"})
   }
   else if(stateOfUpdate.status === 401){
    return res.status(401).send({message: "operator can only change appointment status of his branch"})
   }
   return res.status(404).send({message: "unknown error"})
  }catch (err) {
    console.log(err)
  }
}