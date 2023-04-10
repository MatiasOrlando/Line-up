const { validateToken } = require("../config/token")


exports.isAdmin = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decodedUser = validateToken(token);
    if (decodedUser.admin) {
      req.user = decodedUser;
      return next();
    }
  }
  catch(err){
    return res.status(401).send({ message: "User unathorized" });
  }
};

exports.isOperator = async (req, res, next) => {
  try{
    const { token } = req.query;
    const decodedUser = validateToken(token);
    if (decodedUser.operator) {
      req.user = decodedUser;
      return next();
    }
  }catch(err){
    return res.status(401).send({ message: "User unathorized" });
  }
};
