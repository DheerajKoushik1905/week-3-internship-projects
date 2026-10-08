import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${safe}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed"));
    cb(null, true);
  }
});

const app = express();
app.use(cors());
app.use("/uploads", express.static(uploadsDir));

app.get("/api/images", (_req, res) => {
  const images = fs.readdirSync(uploadsDir)
    .filter((name) => name !== ".gitkeep")
    .map((name) => ({ name, url: `/uploads/${name}` }));
  res.json(images);
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Image is required" });
  res.status(201).json({
    name: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

app.use((error, _req, res, _next) => {
  res.status(400).json({ message: error.message });
});

app.listen(5102, () => console.log("Upload server running on http://localhost:5102"));
