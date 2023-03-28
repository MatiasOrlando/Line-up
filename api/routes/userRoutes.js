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
    userCreated.save();
    return res.send(userRegistered);
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    console.log(user[0]);
    !user[0] && res.status(401).send(`No user found`);
    const validatedUser = await user[0].validatePassword(password);
    console.log(validatedUser, "validateeeeee");
    // console.log(user[0], "USUARIOOOOO");
    // !validatedUser && res.status(401).send(`No authorization`);
    // validatedUser && res.status(200).send(user[0]);
  } catch {
    return res.status(404).send("User not found");
  }
});

// LOGOUT ???.
router.post("/logout", (req, res) => {
  return res.send("ruta para desloguear tu cuenta");
});

router.get("/:id", async (req, res) => {
  // Recibo por params id Usuario const {id} = req.params
  const idUser = "642365b81a45cf8b5f01c8dc";
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
