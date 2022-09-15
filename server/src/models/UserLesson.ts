import mongoose, { Document } from "mongoose";

export interface IUserLesson extends Document {
  userId: string;
  lessonId: string;
  courseId: string;
  currentTime: number;
}

const UserLessonSchema = new mongoose.Schema<IUserLesson>(
  {
    userId: mongoose.Types.ObjectId,
    lessonId: mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId,
    currentTime: Number,
  },
  { timestamps: true }
);

const UserLesson = mongoose.model<IUserLesson>(
  "UserLesson",
  UserLessonSchema,
  "user_lessons"
);
export default UserLesson;
