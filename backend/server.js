// importing packages
const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");
//importing db config
const connectDB = require("./config/db");
//importing routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documents");

connectDB();

const app = express();
const server = http.createServer(app);

// Configure CORS for HTTP requests
//CORS - cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware and routes
app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
