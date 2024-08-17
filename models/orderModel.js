const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  __v: { type: Number, default: 0 },
  qty: { type: String, default: 1 },
});

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  products: [productSchema],
  address: { type: String, required: true },
  userId: { type: String, required: true },
  mobile: { type: String, required: true },
  total: { type: String, required: true },
  status: { type: String, default: "Order Placed" },
});

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
