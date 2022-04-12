const Order = require("../models/orders");

const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const order = await new Order(req.body);
    await order.save();
    res.json({ ok: true, order });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, msg: "there was an error in your order" });
  }
};
const ordersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
    res.json({ ok: true, orders });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createOrder, ordersByUserId };
