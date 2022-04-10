const Order = require("../models/orders");

const createOrder = async (req, res) => {
  try {
    const order = await new Order(req.body);
    await order.save();
    res.json({ ok: true, order });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder };
