const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  sendOtpEmail,
} = require("../middleware/sendEmail");

// User Signup
const signupUser = async (req, res) => {
  const { name, email, password, phone, isAdmin } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = new User({ name, email, password, phone, isAdmin });
    const savedUser = await newUser.save();

    const verificationLink = `http://localhost:5173/verify/${savedUser._id}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify User Email
const verifyUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "Account already verified. Please log in." });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Account verified. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email, password, or unverified account" });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "unverified account" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateToken();
    res.status(200).json({
      token,
      userId: user._id.toString(),
      isAdmin: user.isAdmin,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 3600000;

    await user.save();
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (!otp) return res.status(404).json({ message: "OTP is required" });

  try {
    const user = await User.findOne({ otp, otpExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const resetToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res
      .status(200)
      .json({ token: resetToken, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signupUser,
  verifyUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
