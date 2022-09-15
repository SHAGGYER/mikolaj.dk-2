import mongoose, { Document } from "mongoose";

export interface IHobby extends Document {
  name: string;
  body: string;
  image: string;
}

const HobbySchema = new mongoose.Schema<IHobby>(
  {
    name: String,
    body: String,
    image: String,
  },
  { timestamps: true }
);

const Hobby = mongoose.model<IHobby>("Hobby", HobbySchema, "hobbies");
export default Hobby;
