import mongoose from "mongoose";

const MailSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    subject: String,
    message: String,
    date: Date,
    folder: String,
    seen: Boolean,
  },
  { timestamps: true }
);

const Mail = mongoose.model("Mail", MailSchema, "mails");
export default Mail;
