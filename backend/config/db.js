const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.k2vouiz.mongodb.net/edunet`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
