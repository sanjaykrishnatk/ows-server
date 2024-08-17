const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const jwtResponse = jwt.verify(token, "ows123");
    next();
  } catch (err) {
    res.status(401).json(`Authentication failed ${err}`);
  }
};

module.exports = jwtMiddleware;
