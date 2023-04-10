const { isEmail } = require("validator");
const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  openingHour: { type: String, required: true },
  closingHour: { type: String, required: true },
  allowedClients: { type: Number, required: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, default: null },
    email: {
      type: String,
      default: null,
    },
    name: { type: String, default: null },
    phone: {
      type: Number,
      min: [9, "too few numbers"],
      maxLength: [15, "too many numbers"],
      default: null,
    },
    operator: { type: Boolean, default: true },
  },
});

const Branch = mongoose.model("branch", BranchSchema);

module.exports = Branch;
