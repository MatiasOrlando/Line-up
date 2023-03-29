const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");
const router = require("express").Router();
const validateMiddleware = require("../config/validateMiddleware").isOperator;

router.get("/:id", validateMiddleware, async (req, res, next) => {
  try {
    const branchArray = await Branch.find({
      "user.id": req.params.id,
    });
    if (!branchArray[0].id) {
      return res
        .status(400)
        .send({ message: "operator branch does not exist" });
    }
    const branchId = branchArray[0].id;
    const appointmentsOfBranchArray = await Appointment.find({
      "sucursal.id": branchId,
    });
    if (!appointmentsOfBranchArray[0]) {
      return res
        .status(404)
        .send({ message: "appointments of operator branch does not exist" });
    }
    return res.status(200).send(appointmentsOfBranchArray);
  } catch (err) {
    console.log(err);
  }
});

router.put(
  "/:id/:appointmentId",
  validateMiddleware,
  async (req, res, next) => {
    const status = req.body.status;
    const appointmentId = req.params.appointmentId;
    try {
      if (!status) {
        return res.status(400).send({ message: "status data missing" });
      }

      if (status !== "pending" && status !== "completed") {
        return res.status(400).send({ message: "status passed not valid" });
      }
      if (!appointmentId) {
        return res.status(400).send({ message: "key info missing" });
      }
      const updatedState = await Appointment.findOneAndUpdate(
        { _id: appointmentId },
        { $set: { status: status } },
        { new: true }
      );
      if (!updatedState) {
        return res.status(400).send({ message: "appoinment does not exist" });
      }
      const branch = await Branch.findById(updatedState.sucursal.id);

      if (branch.id === updatedState.sucursal.id.toString()) {
        updatedState.save();
        res.status(200).send({ message: "succesfully updated status" });
      } else {
        res
          .status(401)
          .send({
            message:
              "operator cannot modified status of an appointment from another branch",
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
