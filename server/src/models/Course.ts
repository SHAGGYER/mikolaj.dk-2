import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  duration: number;
  price: number;
}

const CourseSchema = new mongoose.Schema<ICourse>(
  {
    name: String,
    duration: Number,
    price: Number,
  },
  { timestamps: true }
);

const Course = mongoose.model<ICourse>("Course", CourseSchema, "courses");
export default Course;
