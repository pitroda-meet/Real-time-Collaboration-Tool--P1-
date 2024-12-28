const jwt = require("jsonwebtoken");

const verifyResetToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    const errorMessage =
      err.name === "TokenExpiredError"
        ? "Token expired. Please request a new one."
        : "Invalid token. Please try again.";
    res.status(401).json({ message: errorMessage });
  }
};

module.exports = verifyResetToken;
