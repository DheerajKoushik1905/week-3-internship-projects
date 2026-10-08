import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Student from "./models/Student.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Express is connected to MongoDB using Mongoose",
    databaseState: mongoose.connection.readyState
  });
});

app.get("/api/students", async (_req, res) => {
  res.json(await Student.find().sort({ createdAt: -1 }));
});

app.post("/api/students", async (req, res) => {
  try {
    res.status(201).json(await Student.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const port = process.env.PORT || 5002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
