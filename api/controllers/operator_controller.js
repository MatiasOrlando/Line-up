const { operator_services } = require("../services/operator_services");
const { validateToken } = require("../config/token");

exports.get_all_appointments_get = async (req, res, next) => {
  const { token } = req.query;
  const decodedUser = validateToken(token);
  const { email } = decodedUser;
  const number = req.params.numberOfPages;
  const limit = number * 7;
  try {
    const pageOfAppointments = await operator_services.getAllAppointments(
      limit,
      email
    );
    if (!pageOfAppointments.error) {
      return res.status(200).send(pageOfAppointments);
    }
    return res.status(400).send({ message: pageOfAppointments.data.message });
  } catch (err) {
    return res
      .status(400)
      .send("failed to get all appointments of the operator branch");
  }
};

exports.edit_status_of_appointment = async (req, res, next) => {
  const status = req.body.status;
  const { appointmentId } = req.params;
  const { token } = req.query;
  const decodedUser = validateToken(token);
  const { _id } = decodedUser;
  try {
    if (status !== "pending" && status !== "completed") {
      return res.status(400).send({ message: "invalid data types" });
    }
    const stateOfUpdate = await operator_services.editStatusOfAppointment(
      status,
      appointmentId,
      _id
    );
    if (!stateOfUpdate.error && stateOfUpdate.data) {
      return res
        .status(200)
        .send({ message: "status of appointment updated succesfully" });
    }
    if (stateOfUpdate.error && stateOfUpdate.data) {
      return res
        .status(401)
        .send({ message: "operator cannot modifies another operator branch" });
    }
    return res.status(400).send({ message: stateOfUpdate.data.message });
  } catch (err) {
    return res.status(400).send("failed to update the branch status");
  }
};
