const { isEmail } = require("validator");
const mongoose = require("mongoose");

const state = ["pending", "completed", "Cancel"];

const AppointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeOfAppoinment: { type: String, required: true },
  status: { type: String, enum: state, required: true, default: "pending" },
  cancelReason: { type: String, default: null },
  createdAt: { type: Date, default: Date.now() },
  idApp: { type: Number, unique: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
    },
    phone: {
      type: Number,
      min: [9, "too few numbers"],
      maxLength: [15, "too many numbers"],
      required: true,
    },
  },
  sucursal: {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    allowedClients: { type: Number, required: true },
    openingHour: { type: String, required: true },
    closingHour: { type: String, required: true },
  },
});

const Appointment = mongoose.model("appointment", AppointmentSchema);

module.exports = Appointment;
