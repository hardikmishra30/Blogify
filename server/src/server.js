import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/feedback", feedbackRoutes);

// Global error handler to format multer and validation errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  if (err && err.name === "MulterError") {
    return res.status(400).json({ error: err.message });
  }
  if (err) return res.status(500).json({ error: "Server error" });
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

const __dirname = process.cwd();

// Serve Vite build
app.use(express.static(path.join(__dirname, "public", "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
