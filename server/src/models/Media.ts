import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    originalName: String,
    filePath: String,
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", MediaSchema, "media");
export default Media;
