const path = require("path");
const { config } = require("dotenv");
import mongoose from "mongoose";
import Mail from "../models/Mail";
import { MailService } from "../services/MailService";

config({
  path: path.join(__dirname, "../../.env"),
});

const handler = async function () {
  mongoose.connect(process.env.MONGODB_URI!, () => console.log("Connected to MongoDB"))
  const mails: any[] | undefined = await MailService.receiveMail();

  if (mails?.length) {
    console.log("Inserted " + mails.length + " mails");
  }

  process.exit(0);
};

handler();
