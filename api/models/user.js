const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  dni: { type: Number },
  name: { type: String, required: true },
  email: { type: String },
  phone: {
    type: Number,
    min: [9, "too few numbers"],
    maxLength: [15, "too many numbers"],
  },
  password: { type: String },
  salt: { type: String },
  admin: { type: Boolean, default: false },
  operator: { type: Boolean, default: false },
});

// userSchema.pre("save", async function () {
//   try {
//     const user = this;
//     const salt = bcrypt.genSaltSync();
//     user.salt = salt;
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//   } catch (error) {
//     console.error(error);
//   }
// });

// userSchema.methods.validatePassword = async function (password) {
//   try {
//     console.log(this.password, "PASSWORD DB HASHEADA");
//     console.log(this.salt, "SALT DB");
//     console.log(password, "PASSWORD INPUT USER");

//     const hashedPasswordInput = await bcrypt.hash(password, this.salt);
//     console.log(hashedPasswordInput, "PASSWORD HASH ULTIMA");
//     return hashedPasswordInput === this.password;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

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
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
