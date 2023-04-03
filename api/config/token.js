const jwt = require("jsonwebtoken");
const SECRET = "Matias";

function generateToken(payload) {
  const token = jwt.sign({ payload }, SECRET, {
    expiresIn: "2d",
  });

  return token;
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { validateToken, generateToken };
