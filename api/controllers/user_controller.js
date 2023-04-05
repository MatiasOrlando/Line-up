const mapUser = require("../config/userMapped");
const UsersService = require("../services/user_services");
const { validateToken, generateToken } = require("../config/token");
const { passwordUpdate } = require("../config/emailConfirmation");

const registerUser = async (req, res) => {
  try {
    const newUser = await UsersService.userRegister(req.body);
    if (!newUser.error) {
      res.status(200).send(mapUser([newUser.data])[0]);
    }
    return res.status(400).send(newUser.data.message);
  } catch {
    return res.status(404).send(`ERROR registration process`);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await UsersService.getAllUsers();
    if (getAllUsers.error) {
      return res.status(400).send(getAllUsers.data.message);
    }
    return res.status(200).send(mapUser(getAllUsers.data));
  } catch {
    return res.status(404).send(`ERROR Fetching all users`);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogged = await UsersService.userLogIn(email);
    if (!userLogged) return res.status(404).send(`User not found`);
    const validatedUser = await userLogged.data.validatePassword(password);
    if (!validatedUser)
      return res.status(401).send(`No authorization, Invalid credentials`);
    return res.status(200).send(mapUser([userLogged.data])[0]);
  } catch {
    return res.status(404).send("User not found");
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await UsersService.getSingleUser(id);
    if (userFound.error) {
      return res.status(400).send(userFound.data.message);
    }
    return res.status(200).send(mapUser([userFound][0]));
  } catch {
    return res.status(404).send("User doest not exist");
  }
};

const newPasswordEmail = async (req, res) => {
  const { password, token } = req.body;
  try {
    const validUser = validateToken(token);
    if (validUser.payload) {
      const userPasswordUpdate = await UsersService.newPasswordEmail(
        validUser.payload._id,
        password
      );
      if (userPasswordUpdate.error) {
        return res.status(400).send(userPasswordUpdate.data.message);
      }
      await userPasswordUpdate.data.save();
      return res.status(200).send(`Password was successfully updated`);
    } else {
      return res.status(404).send(`Invalid credentials`);
    }
  } catch {
    return res.status(404).send(`Password update currently unavailable`);
  }
};

const newPasswordProfile = async (req, res) => {
  const { password, token } = req.body;
  try {
    const validUser = validateToken(token);
    if (validUser) {
      const userPasswordUpdate = await UsersService.newPasswordEmail(
        validUser._id,
        password
      );
      if (userPasswordUpdate.error) {
        return res.status(400).send(userPasswordUpdate.data.message);
      }
      await userPasswordUpdate.data.save();
      return res.status(200).send(`Password was successfully updated`);
    } else {
      return res.status(404).send(`Invalid credentials`);
    }
  } catch {
    return res.status(404).send(`Password update currently unavailable`);
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
    return res.status(400).send(`Currently unavailable to update password`);
  }
};

const validateUserdata = async (req, res) => {
  const { token } = req.query;
  try {
    const decodeUser = await UsersService.validateUserdata(token);
    res.status(200).send(mapUser([decodeUser.data])[0]);
  } catch (error) {
    return res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  logIn,
  getSingleUser,
  newPasswordEmail,
  newPasswordProfile,
  passwordEmailUpdate,
  validateUserdata,
};
