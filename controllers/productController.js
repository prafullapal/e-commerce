const Products = require("../models/Products");

const getCatalog = async (req, res) => {
  const products = await Products.find();
  if (!products) {
    return next({
      status: 404,
      message: "None of the seller has added any Products",
    });
  }
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next({
      status: 404,
      message: "No Product found. Invalid Product Id",
    });
  }
  res.status(200).json({ product });
};

const getMyCatalog = async (req, res) => {
  const products = await Products.find({ owner: req.user.userId });
  if (!products) {
    return next({
      status: 404,
      message: "You have not added any Product to your catalog",
    });
  }
  res.status(200).json({ products });
};

const clearCatalog = async (req, res) => {
  const catalog = await Products.deleteMany({ owner: req.user.userId });
  if (catalog === 0) {
    return next({
      status: 404,
      message: "No Products found to Delete",
    });
  }
  res
    .status(200)
    .json({ msg: `${catalog} documents have been deleted Successfully!` });
};

const createProduct = async (req, res) => {
  const product = req.body;
  product.owner = req.user.userId;
  if (!product || !product.owner)
    return next({
      status: 404,
      message: "No valid details found",
    });
  const results = await Products.create(product);
  res.status(200).json({ results });
};

const updateProduct = async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body);
  if (!product) {
    return next({
      status: 404,
      message: "Could not Update",
    });
  }
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return next({
      status: 404,
      message: "Could Not Find Product",
    });
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
