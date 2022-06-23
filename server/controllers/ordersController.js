const Order = require("../models/Order");
const ObjectID = require("mongoose").Types.ObjectId;

const createOrder = async (req, res) => {
  const { userId, cart, adress, total, itemCount } = req.body;
  if (!userId || !cart || !adress || !total || !itemCount)
    return res.status(400).json({ message: "Informations are missing" });
  try {
    const result = await Order.create({
      userId: userId,
      cart: cart,
      total: total,
      itemCount: itemCount,
      adress: adress,
    });
    res.status(201).json({ success: `Order has been created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!order) return res.status(400).send("ID unknown : " + req.params.id);
    return res
      .status(200)
      .json({ message: `Order ${req.params.id} has been updated` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const deleteOrder = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await Order.findOneAndDelete({ _id: req.params.id });
    if (!result) return res.status(400).send("Order not found");
    return res
      .status(200)
      .json({ message: `Order ${req.params.id} has been deleted` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getOrder = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await Order.find({ userId: req.params.id });
    if (!result) return res.status(400).send("No order found");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (!orders.length)
    return res.status(400).json({ message: "No orders found" });
  res.json(orders);
};

const getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    if (!income.length)
      return res.status(400).json({ message: "No carts found" });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getIncome,
};
