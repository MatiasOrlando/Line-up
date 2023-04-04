const { validateToken } = require("../config/token")


exports.isAdmin = async (req, res, next) => {
  const { token } = req.query;
  const decodedUser = validateToken(token);
  if (decodedUser.admin) {
    console.log("entramos");
    req.user = decodedUser;
    return next();
  } else {
    return res.status(401).send({ message: "User unathorized" });
  }
};

exports.isOperator = async (req, res, next) => {
  const { token } = req.query;
  const decodedUser = validateToken(token);
  if (decodedUser.operator) {
    req.user = decodedUser;
    return next();
  } else {
    return res.status(401).send({ message: "User unathorized" });
  }
};
