const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cart: {
      cartItems: {
        type: Array,
        default: [],
      },
      itemCount: { type: Number, default: 0 },

      total: { type: Number, default: 0 },
    },
    adress: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
