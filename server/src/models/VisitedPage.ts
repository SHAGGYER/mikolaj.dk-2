import mongoose, { Document } from "mongoose";

interface IVisitedPage extends Document {
  visitorId: string;
  url: string;
  pageTitle?: string;
  scrolledToBottomCount?: boolean;
  timeOnPage?: number;
}

const VisitedPageSchema = new mongoose.Schema(
  {
    visitorId: mongoose.Types.ObjectId,
    url: String,
    pageTitle: String,
    scrolledToBottomCount: Number,
    timeOnPage: Number,
  },
  { timestamps: true }
);

const VisitedPage = mongoose.model(
  "VisitedPage",
  VisitedPageSchema,
  "visited_pages"
);
export default VisitedPage;
