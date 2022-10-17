import mongoose from "mongoose";

const MailAttachmentSchema = new mongoose.Schema(
  {
    path: String,
    ext: String,
  },
  { timestamps: true }
);

const MailAttachment = mongoose.model(
  "MailAttachment",
  MailAttachmentSchema,
  "mail_attachments"
);
export default MailAttachment;
