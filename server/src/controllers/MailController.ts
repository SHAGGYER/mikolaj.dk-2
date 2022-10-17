import { MailService } from "../services/MailService";
import fs from "fs";
import path from "path";
import Mail from "../models/Mail";
import { Request, Response } from "express";
import MailAccount from "../models/MailAccount";
import MailAttachment from "../models/MailAttachment";
import MailContact from "../models/MailContact";

function nl2br(str, is_xhtml) {
  const breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br " + "/>" : "<br>"; // Adjust comment to avoid issue on phpjs.org display

  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}

export class MailController {
  public static async createContact(req, res) {
    const contact = new MailContact(req.body);
    await contact.save();
    res.send({ content: contact });
  }

  public static async searchContacts(req, res) {
    const contacts = await MailContact.find({
      $or: [
        {
          name: new RegExp(req.body.search, "i"),
        },
        {
          address: new RegExp(req.body.search, "i"),
        },
      ],
    });

    res.send({ content: contacts });
  }

  public static async downloadAttachment(req, res) {
    const attachment = await MailAttachment.findById(req.query.id);
    res.download(attachment.path);
  }

  public static async uploadAttachment(req, res) {
    const media = new MailAttachment({
      path: req.file.filename,
    });

    await media.save();
    res.send({ content: media });
  }

  public static async getMailAccounts(req, res) {
    const accounts = await MailAccount.find();
    res.send({ content: accounts });
  }

  public static async createMailAccount(req, res) {
    const existingMailAccount = await MailAccount.findOne({
      address: req.body.address,
    });
    if (existingMailAccount) {
      return res.status(400).send({ error: "MAIL_ACCOUNT_EXISTS" });
    }

    const mailAccount = new MailAccount(req.body);
    await mailAccount.save();

    res.send({ content: mailAccount });
  }

  public static async updateSeen(req, res) {
    await Mail.findByIdAndUpdate(req.params.id, { $set: { seen: true } });
    res.sendStatus(204);
  }

  public static async sendMail(req, res) {
    const mail = new Mail({
      ...req.body,
      from: req.body.fromAddress,
      folder: "sent",
    });
    await mail.save();

    await MailService.sendMail({
      to: req.body.to,
      subject: `Re: ${req.body.subject}`,
      html: req.body.message,
      mailFromName: "Mikolaj Marciniak",
      mailFromAddress: req.body.fromAddress,
      attachments: req.body.attachments,
    });

    res.sendStatus(200);
  }

  public static async fetchMail(req, res) {
    const mails = await MailService.receiveMail();
    res.send(mails);
  }

  public static async getMailById(req: Request, res: Response) {
    const mail = await Mail.findById(req.params.id);
    res.send(mail);
  }

  public static async send(req, res) {
    const result = await MailService.sendMail({
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.message,
      replyTo: process.env.MAIL_FROM,
    });
    if (!result) {
      return res.status(500).send({ error: "SERVER_ERROR" });
    }

    return res.sendStatus(200);
  }

  public static async deleteMails(req, res) {
    await Mail.updateMany(
      { _id: { $in: req.body.ids } },
      { $set: { folder: "trash" } }
    );
    res.sendStatus(200);
  }

  public static async restoreMails(req, res) {
    await Mail.updateMany(
      { _id: { $in: req.body.ids } },
      { $set: { folder: "inbox" } }
    );
    res.sendStatus(200);
  }

  public static async deleteMailsPermanently(req, res) {
    await Mail.deleteMany({ _id: { $in: req.body.ids } });
    res.sendStatus(200);
  }

  public static async listEmails(req, res) {
    const limit = 10;
    const page = req.query.page;
    let query = {};
    if (req.query.folder === "sent") {
      query["from"] = req.query.mailAccount;
    } else {
      query["to"] = req.query.mailAccount;
    }
    const total = await Mail.find({
      ...query,
      folder: req.query.folder,
    }).countDocuments();

    const mails = await Mail.find({
      folder: req.query.folder,
      ...query,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    res.send({ rows: mails, totalRows: total });
  }
}

export const sendNew = async (req, res) => {
  const templateFile = fs.readFileSync(
    path.join(__dirname, "../..", "mail/Email.html")
  );

  const html = templateFile
    .toString()
    .replace("{{MESSAGE}}", nl2br(req.body.message as string, false));

  await MailService.sendMail({
    to: req.body.to,
    subject: `${req.body.subject}`,
    html,
  });

  res.sendStatus(204);
};

export const createOrder = async (req, res) => {
  const user = req.body.user;

  const parsedHtml = `
<h2>Hej Mikolaj</h2>
<p>Der er kommet en ny bestilling</p>
<br />
<div>
    <h3>Bruger</h3>
    <p>Navn: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>Message:<p>
    <p>${user.message}<p>
    <br />
    <hr />
    <br />
    <h3>Bestilling</h3>
    <p>Antal timer: ${req.body.order.hours}</p>
    <p>Total: DKK ${req.body.order.total.toFixed(2)}</p>
</div>
    `;
  const mailSent = await MailService.sendMail({
    to: process.env.MAIL_TO!,
    subject: "Ny Undervisning",
    html: parsedHtml,
    replyTo: user.email,
  });

  if (!mailSent) {
    return res.status(500).send({ success: false });
  }

  return res.sendStatus(204);
};

export const sendMail = async (req, res) => {
  const result = await MailService.sendMail({
    to: process.env.MAIL_TO!,
    subject: req.body.subject,
    html: req.body.message,
    replyTo: process.env.MAIL_FROM,
  });
  if (!result) {
    return res.status(500).send({ error: "SERVER_ERROR" });
  }

  return res.sendStatus(200);
};
