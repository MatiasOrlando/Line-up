const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const { operator_services } = require("../services/operator_services")
const { validateToken } = require("../config/token")



exports.get_all_appointments_get = async (req, res, next) => {
  const { token } = req.query;
  const decodedUser = validateToken(token);
  const { _id } = decodedUser
  const number = req.params.numberOfPages
  const limit = number * 7
  try {
    const pageOfAppointments = await operator_services.getAllAppointments(limit, _id)
    if(pageOfAppointments.error && !pageOfAppointments.data[0]){
      return res.status(400).send({message: "There is not any appointment for this branch"})
    }
    return res.status(200).send(pageOfAppointments)
  } catch (err) {
    console.log(err)
    return res.status(400).send("key data is missing")
  }
}


exports.edit_status_of_appointment = async (req, res, next) => {
  const status = req.body.status;
  const {appointmentId } = req.params
  const { token } = req.query;
  const decodedUser = validateToken(token);
  const { _id } = decodedUser
  try{
   const stateOfUpdate = await operator_services.editStatusOfAppointment(status, appointmentId, _id)
   if(stateOfUpdate.error && stateOfUpdate.data){
    return res.status(400).send({message: "failed to update the branch status"})
   }
   
   if(!stateOfUpdate.err && stateOfUpdate.data){
    return res.status(200).send({message: "updated the status of the branch"})
   }
   else if(stateOfUpdate.err && stateOfUpdate.data){
    return res.status(401).send({message: "operator can only change appointment status of his branch"})
   }
   return res.status(404).send({message: "unknown error"})
  }catch (err) {
    return res.status(400).send("key data is missing")
  }
}