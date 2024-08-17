const mongoose = require("mongoose");
const productSchema = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
};
const products = mongoose.model("products", productSchema);
module.exports = products;
