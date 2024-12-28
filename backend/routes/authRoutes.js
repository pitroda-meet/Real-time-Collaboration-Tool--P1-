const express = require("express");
const {
  signupUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
} = require("../controllers/authController");
const verifyResetToken = require("../middleware/verifyResetToken");

const router = express.Router();

// Auth routes
router.post("/signup", signupUser);
router.get("/verify/:userId", verifyUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", verifyResetToken, resetPassword);

module.exports = router;
