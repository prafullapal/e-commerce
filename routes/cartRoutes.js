const express = require("express");

const router = express.Router();

const {
  getCart,
  addCart,
  deleteCart,
} = require("../controllers/cartController");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, getCart)
  .post(authenticateUser, addCart);

router.route("/:productId").delete(authenticateUser, deleteCart);

module.exports = router;
