import mongoose, { Document } from "mongoose";

export interface IUserCourse extends Document {
  userId: string;
  courseId: string;
  price: number;
  latestLessonId: string;
}

const UserCourseSchema = new mongoose.Schema<IUserCourse>(
  {
    userId: mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId,
    price: Number,
    latestLessonId: String,
  },
  { timestamps: true }
);

const UserCourse = mongoose.model<IUserCourse>(
  "UserCourse",
  UserCourseSchema,
  "user_courses"
);
export default UserCourse;
