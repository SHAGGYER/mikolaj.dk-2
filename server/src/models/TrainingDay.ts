import mongoose, { Document } from "mongoose";

export interface ITrainingDay extends Document {
  date: Date;
  body: string;
}

const TrainingDaySchema = new mongoose.Schema<ITrainingDay>(
  {
    date: Date,
    body: String,
  },
  { timestamps: true }
);

const TrainingDay = mongoose.model<ITrainingDay>(
  "TrainingDay",
  TrainingDaySchema,
  "training_days"
);
export default TrainingDay;
