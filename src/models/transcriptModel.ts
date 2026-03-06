import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: Number,
  description: String,
  priority: String,
  dependencies: [Number],
  status: String
});

const TranscriptSchema = new mongoose.Schema({
  transcriptText: String,
  tasks: [TaskSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Transcript", TranscriptSchema);