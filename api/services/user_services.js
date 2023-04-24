const { validateToken } = require("../config/token");
const User = require("../models/user");

class UsersService {
  static async userRegister(body) {
    try {
      const newUser = await User.create(body);
      return { error: false, data: newUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAllUsers() {
    try {
      const allUsers = await User.find().exec();
      return { error: false, data: allUsers };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async userLogIn(email) {
    try {
      const userRegistered = await User.findOne({
        email,
      });
      return { error: false, data: userRegistered };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getSingleUser(id) {
    try {
      const userFound = await User.findById(id);
      return { error: false, data: userFound };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async newPassword(id, password) {
    try {
      const userPasswordUpdate = await User.findByIdAndUpdate(
        { _id: id },
        {
          password,
        },
        { new: true }
      );
      return { error: false, data: userPasswordUpdate };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async passwordEmailUpdate(email) {
    try {
      const selectedUser = await User.findOne({ email });
      return { error: false, data: selectedUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async validateUserdata(token) {
    try {
      const decodeUser = validateToken(token);
      const userData = await User.findOne({ email: decodeUser.email });
      return { error: false, data: userData || decodeUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async searchUserByEmail(email) {
    try {
      const selectedUser = await User.findOne({ email });
      return { error: false, data: selectedUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async updateUserPhone(email, phone) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { phone },
        { new: true }
      );
      updatedUser.save();
      return { error: false, data: updatedUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async activateUserAccount(email, status) {
    try {
      const activeUser = await User.findOneAndUpdate(
        { email },
        { status },
        { new: true }
      );
      return { error: false, data: activeUser };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = UsersService;
