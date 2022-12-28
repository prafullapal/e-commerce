const Products = require("../models/Products");

const getCatalog = async (req, res, next) => {
  try {
    const products = await Products.find();
    if (!products) {
      return next({
        status: 404,
        message: "None of the seller has added any Products",
      });
    }
    res.status(200).json({ products });
  } catch (err) {
    return next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return next({
        status: 404,
        message: "No Product found. Invalid Product Id",
      });
    }
    res.status(200).json({ product });
  } catch (err) {
    return next(err);
  }
};

const getMyCatalog = async (req, res, next) => {
  try {
    console.log(req.user);
    const products = await Products.find({ owner: req.user.userId });
    if (!products) {
      return next({
        status: 404,
        message: "You have not added any Product to your catalog",
      });
    }
    res.status(200).json({ products });
  } catch (err) {
    return next(err);
  }
};

const clearCatalog = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    //handle req.files
    const product = req.body;
    product.owner = req.user.userId;
    if (!product || !product.owner)
      return next({
        status: 404,
        message: "No valid details found",
      });
    const results = await Products.create(product);
    res.status(200).json({ results });
  } catch (err) {
    return next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return next({
        status: 404,
        message: "Could not Update",
      });
    }
    res.status(200).json({ product });
  } catch (err) {
    return next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return next({
        status: 404,
        message: "Could Not Find Product",
      });
    }
    res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
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
