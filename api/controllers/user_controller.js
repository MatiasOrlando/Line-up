const mapUser = require("../config/userMapped");
const UsersService = require("../services/user_services");
const emailValidator = require("deep-email-validator");
const { validateToken, generateToken } = require("../config/token");
const {
  passwordUpdate,
  accountActivation,
} = require("../config/emailConfirmation");

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    /* const response = await emailValidator.validate(email);
    if (!response.valid) {
      return res.status(400).send({ message: "Not a valid email" });
    } */
    const userToken = generateToken(req.body);
    accountActivation(email, userToken);
    const newUser = await UsersService.userRegister(req.body);
    if (!newUser.error) {
      res.status(201).send(mapUser([newUser.data])[0]);
    }
    return res.status(400).send(newUser.data.message);
  } catch {
    return res.status(500).send({ message: `Debe ser un email valido` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await UsersService.getAllUsers();
    if (getAllUsers.error) {
      return res.status(401).send(getAllUsers.data.message);
    }
    return res.status(200).send(mapUser(getAllUsers.data));
  } catch {
    return res.status(500).send(`ERROR Fetching all users`);
  }
};

const logIn = async (req, res) => {
  const { email, password, secret } = req.body;
  if (secret) {
    const validUser = validateToken(secret);
    if (validUser) {
      const status = "enabled";
      await UsersService.activateUserAccount(email, status);
    }
  }
  const userLogged = await UsersService.userLogIn(email);
  if (userLogged?.data?.status === "enabled") {
    if (!userLogged.data) return res.status(404).send(`User not found`);
    const validatedUser = await userLogged.data.validatePassword(password);
    if (!validatedUser)
      return res.status(401).send(`No authorization, Invalid credentials`);
    return res.status(200).send(mapUser([userLogged.data])[0]);
  } else {
    return res.status(400).send(`Please activate your account before Log in`);
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await UsersService.getSingleUser(id);
    if (userFound.error) {
      return res.status(404).send(userFound.data.message);
    }
    return res.status(200).send(mapUser([userFound.data])[0]);
  } catch {
    return res.status(500).send("Server error");
  }
};

const newPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const validUser = validateToken(token);
    if (validUser || validUser.payload) {
      const userPasswordUpdate = await UsersService.newPassword(
        validUser._id || validUser.payload._id,
        password
      );
      if (userPasswordUpdate.error) {
        return res.status(404).send(userPasswordUpdate.data.message);
      }
      await userPasswordUpdate.data.save();
      return res.status(200).send(`Password was successfully updated`);
    } else {
      return res.status(400).send(`Invalid credentials`);
    }
  } catch {
    return res.status(500).send(`Server Error`);
  }
};

const passwordEmailUpdate = async (req, res) => {
  const { email } = req.body;
  try {
    const selectedUser = await UsersService.passwordEmailUpdate(email);
    if (selectedUser.data) {
      const userToken = generateToken(selectedUser.data);
      passwordUpdate(email, userToken);
      res.status(200).send(`Email update password sent`);
    } else {
      return res.status(400).send(`Invalid email`);
    }
  } catch {
    return res.status(500).send(`Currently unavailable to update password`);
  }
};

const validateUserdata = async (req, res) => {
  const { token } = req.query;
  try {
    const decodeUser = await UsersService.validateUserdata(token);
    if (decodeUser.error) {
      return res.status(400).send("Invalid token");
    }
    res.status(200).send(mapUser([decodeUser.data])[0]);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  logIn,
  getSingleUser,
  newPassword,
  passwordEmailUpdate,
  validateUserdata,
};
