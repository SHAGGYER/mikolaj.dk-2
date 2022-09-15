import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  duration: number;
  price: number;
  published: boolean;
}

const CourseSchema = new mongoose.Schema<ICourse>(
  {
    name: String,
    duration: Number,
    price: Number,
    published: Boolean,
  },
  { timestamps: true }
);

const Course = mongoose.model<ICourse>("Course", CourseSchema, "courses");
export default Course;
