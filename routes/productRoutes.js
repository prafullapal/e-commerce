const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });

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

router.post(
  "/add",
  upload.any(),
  authenticateUser,
  authorizePermissions("seller"),
  createProduct
);
router
  .route("/add/:id")
  .patch(
    authenticateUser,
    authorizePermissions("seller", "admin"),
    updateProduct
  );
router
  .route("/myCatalog")
  .get(authenticateUser, authorizePermissions("seller"), getMyCatalog);
router
  .route("/clearCatalog")
  .delete(authenticateUser, authorizePermissions("seller"), clearCatalog);
router
  .route("/:id")
  .get(getProduct)
  .delete(
    authenticateUser,
    authorizePermissions("seller", "admin"),
    deleteProduct
  );

module.exports = router;
