const Product = require("../models/products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ ok: true, products });
  } catch (error) {
    res.json({ ok: false, msg: "there was an error" });
  }
};
const detailedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ ok: false, msg: "product not found" });
    }
    res.status(200).json({ ok: true, product });
  } catch (error) {
    res.json({ ok: false, msg: "there was an error" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req._id);
  try {
    if (req.role !== "administrator") {
      return res.status(404).json({ ok: false, msg: "unauthorized" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.json({ ok: false, msg: "there was an error" });
  }
};
const createProduct = async (req, res) => {
  let imageUrl;
  try {
    if (req.role !== "administrator") {
      return res.status(404).json({ ok: false, msg: "unauthorized" });
    }
    if (req.file?.filename) {
      imageUrl = req.file.filename;
    }
    const newProduct = await new Product(req.body);
    newProduct.imageUrl = imageUrl;

    const product = await newProduct.save();

    res.status(201).json({ ok: true, product });
  } catch (error) {
    res.json({ ok: false, msg: "there was an error" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;

  try {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
      return res.status(404).json({ ok: false, msg: "product not found" });
    }
    if (req.role !== "administrator") {
      return res.status(404).json({ ok: false, msg: "unauthorized" });
    }
    let image;
    if (req.file?.filename) {
      image = req.file.filename;
    } else {
      image = existProduct.image;
    }
    newProduct.imageUrl = image;
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    res.status(200).json({ ok: true, updatedProduct });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, msg: "there was an error" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  detailedProduct,
  deleteProduct,
};
