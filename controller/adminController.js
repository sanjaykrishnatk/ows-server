const admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const adminCheck = await admin.findOne({ phone, password });
    if (adminCheck) {
      const token = jwt.sign({ adminId: adminCheck._id }, "owsadmin");
      res.status(200).json({ adminCheck, token });
    } else {
      res.status(401).json(`Invalid email or password`);
    }
  } catch (err) {
    res.status(406).json(err);
  }
};
