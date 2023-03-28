const { isEmail } = require("validator")
const mongoose = require("mongoose");


const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  hourRange: { type: String, required: true },
  allowedClients: { type: Number, required: true }, 
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
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
    operator: { type: Boolean, default: true, required: true },
  },
});

const Branch = mongoose.model("branch", BranchSchema)

module.exports = Branch;
