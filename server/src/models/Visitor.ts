import mongoose, { Document } from "mongoose";

export interface IVisitor extends Document {
  ipAddress: string;
  pagesVisited: Array<any>;
  language: string;
  country: string;
}

const VisitorSchema = new mongoose.Schema(
  {
    ipAddress: String,
    pagesVisited: Array,
    language: String,
    country: String,
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", VisitorSchema, "visitors");
export default Visitor;
