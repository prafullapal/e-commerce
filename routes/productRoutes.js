const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

const {
  getCatalog,
  getProduct,
  getMyCatalog,
  createProduct,
  updateProduct,
  deleteProduct,
  clearCatalog,
} = require("../controllers/productController");

router.route("/").get(getCatalog);

router
  .route("/add")
  .post(authenticateUser, authorizePermissions("seller"), createProduct);
router
  .route("/add/:id")
  .patch(
    authenticateUser,
    authorizePermissions("seller", "admin"),
    updateProduct
  );
router
  .route("/:id")
  .get(getProduct)
  .delete(
    authenticateUser,
    authorizePermissions("seller", "admin"),
    deleteProduct
  );

router
  .route("/myCatalog")
  .get(authenticateUser, authorizePermissions("seller"), getMyCatalog);
router
  .route("/clearCatalog")
  .delete(authenticateUser, authorizePermissions("seller"), clearCatalog);

module.exports = router;
