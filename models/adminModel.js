const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const admins = mongoose.model("admins", adminSchema);
module.exports = admins;
