import mongoose, { Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  version: string;
  date: Date;
  updateUrl: string;
  fileName: string;
}

const GameSchema = new mongoose.Schema<IGame>(
  {
    name: String,
    version: String,
    date: Date,
    updateUrl: String,
    fileName: String,
  },
  { timestamps: true }
);

const Game = mongoose.model<IGame>("Game", GameSchema);
export default Game;
