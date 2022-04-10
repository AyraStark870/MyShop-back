const { model, Schema } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  inStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

module.exports = model("Product", productSchema);
