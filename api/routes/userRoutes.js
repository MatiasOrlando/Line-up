const User = require("../models/user");
const router = require("express").Router();
const {
  emailConfirmation,
  passwordUpdate,
} = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");
const { validateToken, generateToken } = require("../config/token");

router.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    return res.status(200).send(`User registered successfully`);
  } catch (error) {
    return res.status(400).send("Invalid data");
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().exec();
    const allUsers = mapUser(users);
    return res.status(200).send(allUsers);
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
    return res.status(200).send(mapUser([user])[0]);
  } catch {
    return res.status(404).send("User not found");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findById(id);
    const selectedUser = mapUser([userFound]);
    return res.status(200).send(selectedUser[0]);
  } catch (error) {
    console.error(error);
  }
});

router.put("/new-password-email", async (req, res) => {
  // Recibimos por req.body newPassword, idUser, y token
  const { password, token } = req.body;
  try {
    const validUser = validateToken(token);
    if (validUser.payload) {
      const userPasswordUpdate = await User.findByIdAndUpdate(
        { _id: validUser.payload._id },
        {
          password,
        },
        { new: true }
      );
      await userPasswordUpdate.save();
      return res.status(200).send(`Password was successfully updated`);
    } else {
      return res.status(404).send(`Invalid credentials`);
    }
  } catch (error) {
    return res.status(404).send(`Password update currently unavailable`);
  }
});

router.put("/new-password-profile", async (req, res) => {
  // Recibimos por req.body newPassword y token
  const { password, token } = req.body;
  try {
    const validUser = validateToken(token);
    if (validUser) {
      const userPasswordUpdate = await User.findByIdAndUpdate(
        { _id: validUser._id },
        {
          password,
        },
        { new: true }
      );
      await userPasswordUpdate.save();
      return res.status(200).send(`Password was successfully updated`);
    } else {
      return res.status(404).send(`Invalid credentials`);
    }
  } catch (error) {
    return res.status(404).send(`Password update currently unavailable`);
  }
});

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});

router.put("/password-update-email", async (req, res) => {
  const { email } = req.body;
  try {
    const selectedUser = await User.findOne({ email });
    if (selectedUser) {
      const userToken = generateToken(selectedUser);
      passwordUpdate(email, userToken);
      res.status(200).send(`Email update password sent`);
    } else {
      return res.status(400).send({ message: "Invalid email" });
    }
  } catch {
    return res
      .status(400)
      .send({ message: "Currently unavailable to update password" });
  }
});

router.get("/email/token", async (req, res) => {
  const { token } = req.query;
  try {
    const decodeUser = validateToken(token);
    res.status(200).send(mapUser([decodeUser])[0]);
  } catch (error) {
    return res.status(400).send({ message: "Invalid token" });
  }
});

router.get("/email/:email", async (req, res) => {
  // Recibo por params id Usuario const {id} = req.params
  const email = req.params.email;
  try {
    if (!email) {
      return res.status(400).send({ message: "email cannot be undefined" });
    }
    const userFound = await User.findOne({ email: email }).exec();
    if (!userFound) {
      return res
        .status(400)
        .send({ message: "the email passed is not from any saved user" });
    }
    return res.status(200).send(userFound);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
