const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const emailConfirmation = require("../config/emailConfirmation");

router.post("/register", async (req, res) => {
  const newUser = {
    dni: 79324048,
    name: "Pepe",
    email: "pepe@gmail.com",
    phone: Number("06477042982"),
    password: "pepeargento",
  };
  try {
    const userCreated = await User.create(newUser);
    userCreated.save();
    return res.send(userCreated);
  } catch (error) {
    console.error(error);
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});

router.post("/find", async (req, res) => {
  const idUser = "6421a6b71fea1f5d51a54697";
  try {
    const userFound = await User.findById(idUser).exec();
    const { operator, email, phone, id } = userFound;
    const newBranch = await Branch.create({
      name: "sucursal",
      location: "Salta",
      hourRange: "12-13",
      allowedClients: 1030,
      user: { id, email, phone, operator },
    });
    newBranch.save();
    res.send(newBranch);
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
  const idUser = "6421a6b71fea1f5d51a54697";
  try {
    const userFound = await User.findById(idUser).exec();
    return res.send(userFound);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  // Recibimos por req.body newPassword, idUser
  const idUser = "6421a6b71fea1f5d51a54697";
  const { password } = req.body;
  try {
    const userPasswordUpdate = await User.findByIdAndUpdate(
      { _id: idUser },
      {
        password,
      },
      { new: true }
    );
    const passwordUserUpdated = await userPasswordUpdate.save();
    res.send(passwordUserUpdated);
  } catch (error) {
    console.error(error);
  }
});

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});
module.exports = router;
