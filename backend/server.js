// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // clean, no deprecated options needed
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from project-js backend!" });
});

// Example DB test route (optional, to confirm DB works)
const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model("Test", TestSchema);

app.get("/api/test-db", async (req, res) => {
  try {
    const doc = await Test.create({ name: "Hello MongoDB" });
    res.json({ message: "✅ DB write successful", doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});