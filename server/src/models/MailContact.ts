import mongoose from "mongoose";

const MailContactSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
  },
  { timestamps: true }
);

const MailContact = mongoose.model(
  "MailContact",
  MailContactSchema,
  "mail_contacts"
);
export default MailContact;
