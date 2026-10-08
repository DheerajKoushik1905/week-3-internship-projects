import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "ManagerUser", required: true }
}, { timestamps: true });

export default mongoose.model("ManagerTask", schema);
