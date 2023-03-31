const User = require("../models/user")


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

