import AWS from "aws-sdk";
import Mail from "../models/Mail";
import MailAttachment from "../models/MailAttachment";
const simpleParser = require("mailparser").simpleParser;
const nodemailer = require("nodemailer");
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

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

        const filePath = path.join(__dirname, "../../uploads/attachments");
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
        }

        let attachmentPaths: any[] = [];
        for (let attachment of email.attachments) {
          const fileName = v4() + path.extname(attachment.filename);
          fs.createWriteStream(filePath + "/" + fileName).write(
            attachment.content
          );
          const dbAttachment = new MailAttachment({
            path: filePath + "/" + fileName,
            ext: path.extname(attachment.filename),
          });
          await dbAttachment.save();
          attachmentPaths.push(dbAttachment);
        }

        mails.push({
          from: email.from.value[0].address,
          to: email.to.value[0].address,
          subject: email.subject,
          message: email.html || email.textAsHtml,
          date: email.date,
          folder: "inbox",
          seen: false,
          attachments: attachmentPaths.map((x) => x._id),
        });

        console.log(email.attachments);
      } catch (e) {
        console.log(e);
      }
    }
    const objects = data.Contents.map((obj) => ({ Key: obj.Key }));

    if (objects.length) {
      await s3
        .deleteObjects({ ...req, Delete: { Objects: objects } })
        .promise();
    }

    if (mails.length) {
      for (let mail of mails) {
        const newMail = new Mail(mail);
        await newMail.save();
      }
      await MailService.sendMail({
        to: "mikolaj73@gmail.com",
        subject: "New mails received for *.mikolaj.dk",
        html: `You have ${mails.length} new mails`,
      });
    }

    return mails;
  }

  static async sendMail({
    to,
    subject,
    html,
    replyTo,
    mailFromName,
    mailFromAddress,
    attachments,
  }: {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    mailFromName?: string;
    mailFromAddress?: string;
    attachments?: any[];
  }) {
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

      const fromName = mailFromName ? mailFromName : process.env.MAIL_NAME;
      const fromAddress = mailFromAddress
        ? mailFromAddress
        : process.env.MAIL_FROM;

      await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to,
        subject,
        html,
        replyTo,
        attachments,
      });

      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}
