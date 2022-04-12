const { model, Schema } = require("mongoose");

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    userAddress: { type: String, required: true },
    numberOfItems: { type: Number, required: true },
    total: { type: Number, required: true },
    paid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = model(
  "Order",
  orderSchema.plugin(require("mongoose-autopopulate"))
);
