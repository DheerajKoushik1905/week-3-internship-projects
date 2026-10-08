import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
app.use(express.json());

app.get("/api/users", async (_req, res) => res.json(await User.find()));

app.post("/api/users", async (req, res) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Deleted" });
});

const port = process.env.PORT || 5005;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Postman practice API on http://localhost:${port}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
