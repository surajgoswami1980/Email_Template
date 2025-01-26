const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env

const app = express();

// Middleware
const allowedOrigins = [
  "https://email-template-z4qx-git-main-surajs-projects-dc039644.vercel.app", // Your deployed frontend URL
];

// CORS middleware configuration
app.use(
  cors({
    origin: allowedOrigins, // Only allow the specified URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection using environment variable
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/emails", emailRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend server!" });
});



// Start Server using environment variable for PORT
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
