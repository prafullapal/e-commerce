const Carts = require("../models/carts");
const Products = require("../models/Products");

const getCart = async (req, res) => {
  const cart = await Carts.find({ owner: req.user.userId });
  if (!cart) {
    return next({
      status: 404,
      message: "The Cart is Empty",
    });
  }
  res.status(200).json({ cart });
};

const addCart = async (req, res) => {
  if (!req.query.productId || !req.query.quantity)
    return next({
      status: 400,
      message: "Product Id with quantity are required to add to cart",
    });
  const product = await Products.findById(req.query.productId);
  const isFirstProduct = (await Carts.countDocuments({})) === 0;
  if (isFirstProduct) {
    const cart = await Carts.create({
      owner: req.user.userId,
      products: [
        {
          productId: product._id,
          name: product.name,
          quantity: req.query.quantity,
          price: product.price,
        },
      ],
    });
    cart.bill += req.query.quantity * product.price;
    const result = await cart.save();
    return res.status(200).json({ result });
  }
  const cart = await Carts.findOne({ owner: req.user.userId });
  cart.products.push({
    productId: product._id,
    name: product.name,
    quantity: req.query.quantity,
    price: product.price,
  });
  cart.bill += req.query.quantity * product.price;
  const result = await cart.save();
  return res.status(200).json({ result });
};

const deleteCart = async (req, res) => {
  //remove the product from cart
  const cart = await Carts.findOne({ owner: req.user.userId });
  if (!cart) {
    return next({
      status: 404,
      message: "Cart is Empty",
    });
  }

  const productIndex = cart.products.findIndex(
    (product) => product.productId == req.params.productId
  );

  if (productIndex > -1) {
    let product = cart.products[productIndex];
    cart.bill -= product.quantity * product.price;
    if (cart.bill < 0) {
      cart.bill = 0;
    }
    cart.products.splice(productIndex, 1);
    cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    cart = await cart.save();

    res.status(200).json({ cart });
  } else {
    return next({
      status: 404,
      message: "Product not found",
    });
  }

  res.status(200);
};

module.exports = { getCart, addCart, deleteCart };
