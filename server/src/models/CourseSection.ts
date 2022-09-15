import mongoose, { Document } from "mongoose";

export interface ICourseSection extends Document {
  name: string;
  courseId: string;
  order: number;
}

const CourseSectionSchema = new mongoose.Schema<ICourseSection>(
  {
    name: String,
    courseId: mongoose.Types.ObjectId,
    order: Number,
  },
  { timestamps: true }
);

const CourseSection = mongoose.model<ICourseSection>(
  "CourseSection",
  CourseSectionSchema,
  "course_sections"
);
export default CourseSection;
