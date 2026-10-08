import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const app = express();
app.use(express.json());

app.get("/api/products", async (_req, res) => {
  res.json(await Product.find().sort({ createdAt: -1 }));
});

app.post("/api/products", async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

const port = process.env.PORT || 5003;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`CRUD API running on http://localhost:${port}`)))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
