const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        name: { type: String, required: true },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
