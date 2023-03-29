
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import {isEmail} from ("validator")

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
  salt: {
    type: String,
  },
  admin: { type: Boolean, default: false },
  operator: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  const user = this;
  // if (!user.isModified("password")) {
  //   console.log("error password");
  // }
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  const hashedPassword = await bcrypt.hash(user.password, user.salt);
  return (user.password = hashedPassword);
});

userSchema.methods.validatePassword = async function (password) {
  const hashedPasswordInput = await bcrypt.hash(password, this.salt);
  return hashedPasswordInput === this.password;
};

const User = mongoose.model("user", userSchema);

export default User
