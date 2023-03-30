const User = require("../models/user");
const Branch = require("../models/branch");
const router = require("express").Router();
const emailConfirmation = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");

router.post("/register", async (req, res) => {
  try {
    const userCreated = await User.create(req.body);
    return res.status(200).send(`User registered successfully`);

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
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).send(`User not found`);
    const validatedUser = await user.validatePassword(password);
    if (!validatedUser)
      return res.status(401).send(`No authorization, Invalid credentials`);
    return res.status(200).send(user);
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
