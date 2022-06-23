const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

const deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await User.findOneAndDelete({ _id: req.params.id });
    if (!result) return res.status(400).send("User not found");
    return res
      .status(200)
      .json({ message: ` User ${req.params.id} has been deleted` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    if (!user) return res.status(400).send("ID unknown : " + req.params.id);
    return res.status(200).json({ message: ` User ${user} has been updated` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await User.findOne({ _id: req.params.id });
    if (!result) return res.status(400).send("No user found");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users.length) return res.status(400).json({ message: "No users found" });
  res.json(users);
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  getStats,
};
