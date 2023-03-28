const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  dni: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, validate: [isEmail, "invalid email"] },
  phone: {
    type: Number,
    min: [9, "too few numbers"],
    maxLength: [15, "too many numbers"],
    required: true,
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
    user.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
});

userSchema.methods.validatePassword = async function (password) {
  // console.log(password, "PASSWORD INPUT USER");
  try {
    console.log(this.password, "PASSWORD DB HASHEADA");
    console.log(this.salt, "SALT DB");
    console.log(password);
    const hashedPasswordInput = await bcrypt.hash(password, this.salt);
    console.log(hashedPasswordInput, "PASSWORD HASH ULTIMA");
    return hashedPasswordInput === this.password;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
