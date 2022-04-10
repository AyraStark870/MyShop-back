const { model, Schema } = require("mongoose");

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  orderItems: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product", required: true }, //id del producto
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  userAddress: { type: String, required: true },
  numberOfItems: { type: Number, required: true },
  total: { type: Number, required: true },
});

// userSchema.methods.toJSON = function () {
//   const { __v, password, ...usuario } = this.toObject();
//   return usuario;
// };

// "user":"624e62d8ae3a53096746ed8c",
// "orderItems":[{
//     "_id":"624e7fdb031626d43f03eea6",
//     "quantity":2,
//     "price":12
// }],
// "userAddress":"santa fe 13",
// "numberOfItems":2,
// "total":5

module.exports = model(
  "Order",
  orderSchema.plugin(require("mongoose-autopopulate"))
);
