import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "TodoUser", required: true }
}, { timestamps: true });
export default mongoose.model("TodoTask", schema);
