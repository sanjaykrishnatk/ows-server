const Order = require("../models/orderModel");
const getNextOrderId = require("../functions/orderId");
exports.orderPlacementController = async (req, res) => {
  const { products, address, userId, mobile, total } = req.body;
  try {
    const orderId = await getNextOrderId();

    const newOrder = new Order({
      orderId,
      products,
      address,
      userId,
      mobile,
      total,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(401).json(`Soemthing went wrong ${err}`);
  }
};

exports.fetchOrderController = async (req, res) => {
  const { id } = req.params;
  try {
    const userOrders = await Order.find({ userId: id }).sort({ _id: -1 });
    if (userOrders) {
      res.status(200).json(userOrders);
    } else {
      res.status(406).json("No orders found");
    }
  } catch (err) {
    res.status(401).json(`Something went wrong ${err}`);
  }
};
exports.updateOrderController = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(401).json(`Something went wrong ${err}`);
  }
};
exports.allOrdersController = async (req, res) => {
  try {
    const result = await Order.find().sort({ _id: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json(`Something went wrong ${err}`);
  }
};
