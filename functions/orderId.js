const Counter = require("../models/counterModel");

async function getNextOrderId() {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "orderId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}

module.exports = getNextOrderId;
