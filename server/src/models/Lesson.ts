import mongoose, { Document } from "mongoose";

export interface ILesson extends Document {
  name: string;
  duration: number;
  filepath: string;
  courseId: string;
  sectionId: string;
  order: number;
  uuid: string;
  freePreview: boolean;
}

const LessonSchema = new mongoose.Schema<ILesson>(
  {
    name: String,
    duration: Number,
    filepath: String,
    courseId: mongoose.Types.ObjectId,
    sectionId: mongoose.Types.ObjectId,
    order: Number,
    uuid: String,
    freePreview: Boolean,
  },
  { timestamps: true }
);

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema, "lessons");
export default Lesson;
