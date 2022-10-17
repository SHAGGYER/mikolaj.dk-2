import mongoose from "mongoose";

const MailAccountSchema = new mongoose.Schema(
  {
    address: String,
  },
  { timestamps: true }
);

const MailAccount = mongoose.model(
  "MailAccount",
  MailAccountSchema,
  "mail_accounts"
);
export default MailAccount;
