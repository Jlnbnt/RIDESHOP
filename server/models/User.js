const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dx5ip73lv/image/upload/v1655795319/ecommerce/DefaultUser_lilyhw.png",
    },
    refreshToken: [String],
    cart: {
      cartItems: {
        type: Array,
        default: [],
      },
      itemCount: { type: Number, default: 0 },

      total: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
