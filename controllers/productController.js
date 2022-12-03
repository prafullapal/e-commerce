const Products = require("../models/Products");

const getCatalog = async (req, res) => {
  const products = await Products.find();
  if (!products) {
    return res
      .status(404)
      .json({ msg: "None of the seller has added any Products." });
  }
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ msg: "No Product found. Invalid Product Id." });
  }
  res.status(200).json({ product });
};

const getMyCatalog = async (req, res) => {
  const products = await Products.find({ owner: req.user.userId });
  if (!products) {
    return res
      .status(404)
      .json({ msg: "You have not added any Product to your catalog." });
  }
  res.status(200).json({ products });
};

const clearCatalog = async (req, res) => {
  const catalog = await Products.deleteMany({ owner: req.user.userId });
  if (catalog === 0) {
    return res.status(404).json({ msg: "No Products found to Delete" });
  }
  res
    .status(200)
    .json({ msg: `${catalog} documents have been deleted Successfully!` });
};

const createProduct = async (req, res) => {
  const product = req.body;
  product.owner = req.user.userId;

  const results = await Products.create(product);
  //create error condition
  res.status(200).json({ results });
};

const updateProduct = async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body);
  if (!product) {
    return res.status(404).json({ msg: "Could not Update" });
  }
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Could Not Find Product" });
  }
  res.status(200).json(product);
};

module.exports = {
  getCatalog,
  getProduct,
  getMyCatalog,
  clearCatalog,
  createProduct,
  updateProduct,
  deleteProduct,
};
