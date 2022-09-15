import mongoose from "mongoose";
import AWS from "aws-sdk";
import Mail from "../models/Mail";
const simpleParser = require("mailparser").simpleParser;
const nodemailer = require("nodemailer");

export class MailService {
  static async receiveMail() {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AMAZON_ACCESS_KEY,
      secretAccessKey: process.env.AMAZON_SECRET_KEY,
    });

    const req: any = {
      Bucket: "mail.mikolaj.dk",
    };

    let mails: any[] = [];
    const data = await s3.listObjects(req).promise();

    if (!data.Contents?.length) {
      return [];
    }

    for (let object of data.Contents) {
      try {
        const file = await s3.getObject({ ...req, Key: object.Key }).promise();

        if (!file) continue;
        const email = await simpleParser(file.Body);

        mails.push({
          from: email.from.value[0].address,
          to: process.env.MAIL_FROM,
          subject: email.subject,
          message: email.text,
          date: email.date,
          folder: "inbox",
          seen: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
    const objects = data.Contents.map((obj) => ({ Key: obj.Key }));
    console.log(data.Contents);

    if (objects.length) {
      await s3
        .deleteObjects({ ...req, Delete: { Objects: objects } })
        .promise();
    }

    if (mails.length) {
      await Mail.insertMany(mails);
      await MailService.sendMail({
        to: "mikolaj73@gmail.com",
        subject: "New mails received for *.mikolaj.dk",
        html: `You have ${mails.length} new mails`,
      });
    }

    return mails;
  }

  static async sendMail({ to, subject, html, replyTo }: any) {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: true },
      });

      await transporter.sendMail({
        from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_FROM}>`,
        to,
        subject,
        html,
        replyTo: replyTo,
      });

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}
