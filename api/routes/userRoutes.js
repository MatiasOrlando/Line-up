const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const emailConfirmation = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");

router.post("/register", async (req, res) => {
  const newUser = {
    dni: 793242228,
    name: "Tomi",
    email: "tomi@gmail.com",
    phone: Number("06477042982"),
    password: "tomitest",
  };
  try {
    const userCreated = await User.create(newUser);
    const userRegistered = mapUser([userCreated]);
    console.log(userCreated);
    userCreated.save();
    return res.send(userRegistered[0]);
  } catch (error) {
    console.error(error);
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().exec();
    const allUsers = mapUser(users);
    return res.send(allUsers);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", (req, res) => {
  return res.send("ruta para loguar tu cuenta");
});

// LOGOUT ???.
router.post("/logout", (req, res) => {
  return res.send("ruta para desloguear tu cuenta");
});

router.get("/:id", async (req, res) => {
  // Recibo por params id Usuario const {id} = req.params
  const idUser = "6422f981301b66c115c337e9";
  try {
    const userFound = await User.findById(idUser).exec();
    const selectedUser = mapUser([userFound]);
    return res.send(selectedUser);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  // Recibimos por req.body newPassword, idUser
  const idUser = "6422f981301b66c115c337e9";
  const { password } = req.body;
  try {
    const userPasswordUpdate = await User.findByIdAndUpdate(
      { _id: idUser },
      {
        password,
      },
      { new: true }
    );
    await userPasswordUpdate.save();
    return res.send(`Password was successfully updated`);
  } catch (error) {
    console.error(error);
  }
});

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});
module.exports = router;
