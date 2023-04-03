const User = require("../models/user");
const validateToken = require("../config/token");

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.admin) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unathorized" });
    }
  } catch (err) {
    return res.status(404).json({ message: "Unknown Error" });
  }
};

exports.isOperator = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.operator) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unathorized" });
    }
  } catch (err) {
    return res.status(404).json({ message: "Unknown Error" });
  }
};

// exports.isAdmin = async (req, res, next) => {
//   const { token } = req.query;
//   const decodedUser = validateToken(token);
//   if (decodedUser.admin) {
//     req.user = decodedUser;
//     return next();
//   } else {
//     return res.status(401).send({ message: "User unathorized" });
//   }
// };

// exports.isOperator = async (req, res, next) => {
//   const { token } = req.query;
//   const decodedUser = validateToken(token);
//   if (decodedUser.operator) {
//     req.user = decodedUser;
//     return next();
//   } else {
//     return res.status(401).send({ message: "User unathorized" });
//   }
// };
