const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register); //Tested Postman
router.post("/login", login); //Tested Postman
router.get("/logout", authenticateUser, logout);
router.get("/verify-email", verifyEmail); //Tested Postman
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
