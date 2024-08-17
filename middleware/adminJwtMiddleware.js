const jwt = require("jsonwebtoken");

const adminJwtMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const jwtResponse = jwt.verify(token, "owsadmin");
    req.payload = jwtResponse.adminId;
    next();
  } catch (err) {
    res.status(401).json(`Authentication failed ${err}`);
  }
};

module.exports = adminJwtMiddleware;
