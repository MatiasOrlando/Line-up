const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { isEmail } = require("validator");

const state = ["disabled", "enabled"];

const userSchema = new mongoose.Schema({
  status: { type: String, enum: state, default: "disabled" },
  dni: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    unique: true,
  },
  phone: {
    type: Number,
    min: [7, "too few numbers"],
    maxLength: [15, "too many numbers"],
    default: 11000000,
  },
  password: { type: String, required: true },
  salt: { type: String },
  admin: { type: Boolean, default: false },
  operator: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  try {
    const user = this;
    const salt = bcrypt.genSaltSync(9);
    user.salt = salt;
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return (user.password = hashedPassword);
  } catch (error) {
    console.error(error);
  }
});

userSchema.methods.validatePassword = async function (password) {
  try {
    const hashedPasswordInput = await bcrypt.hash(password, this.salt);
    return hashedPasswordInput === this.password;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
