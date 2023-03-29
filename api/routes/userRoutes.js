const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const emailConfirmation = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");

router.post("/register", async (req, res) => {
  const newUser = {
    dni: 37932408,
    name: "matias",
    email: "mat@gmail.com",
    phone: Number("06477042982"),
    password: "test",
  };
  try {
    const userCreated = await User.create(newUser);
    // const userRegistered = mapUser([userCreated]);
    const test = await userCreated.save();
    return res.send(test);
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
  // console.log(user);
  // const isValidPassword = await user.validatePassword(password);
  // if (isValidPassword) {
  //   console.log("user valido");
  // } else {
  //   console.log("user invalido");
  // }
  // res.send(user);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    const validatedUser = await user.validatePassword(password);
    if (!validatedUser) {
      console.log("USUARIO INVALIDOO");
    }
    res.send(user);

    // console.log(user[0], "USUARIOOOOO");
    // !validatedUser && res.status(401).send(`No authorization`);
    // validatedUser && res.status(200).send(user[0]);
  } catch {
    return res.status(404).send("User not found");
  }
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
