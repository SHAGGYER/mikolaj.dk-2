import mongoose, { Document } from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    githubUrl: String,
    demoUrl: String,
    description: String,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema, "projects");
export default Project;
