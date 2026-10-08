import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Task from "./models/Task.js";
import auth from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

app.get("/api/tasks", auth, async (req, res) => {
  const filter = { owner: req.user.id };
  if (req.query.status) filter.status = req.query.status;
  res.json(await Task.find(filter).sort({ createdAt: -1 }));
});

app.post("/api/tasks", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    priority: req.body.priority,
    owner: req.user.id
  });
  res.status(201).json(task);
});

app.put("/api/tasks/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

app.delete("/api/tasks/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

const port = process.env.PORT || 5103;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Task Manager API on http://localhost:${port}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
