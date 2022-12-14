import multer from "multer";

const router = require("express").Router();
import {
  createOrder,
  sendNew,
  MailController,
} from "../controllers/MailController";
import { IsAdmin } from "../middleware/IsAdmin";
import path from "path";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../..", "uploads"));
  },
  filename: function (_req, file, cb) {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.delete("/delete-account/:id", IsAdmin, MailController.deleteMailAccount);
router.post(
  "/upload-mail-attachment",
  IsAdmin,
  upload.single("file"),
  MailController.uploadAttachment
);
router.post("/create-contact", IsAdmin, MailController.createContact);
router.post("/search-contacts", IsAdmin, MailController.searchContacts);
router.get("/download-attachment", MailController.downloadAttachment);
router.post("/createOrder", createOrder);
router.post("/sendMail", MailController.sendContactMail);
router.post("/delete", IsAdmin, MailController.deleteMails);
router.get("/mail-accounts", IsAdmin, MailController.getMailAccounts);
router.get("/fetch-mail", IsAdmin, MailController.fetchMail);
router.get("/", IsAdmin, MailController.listEmails);
router.get("/:id", IsAdmin, MailController.getMailById);
router.post("/", IsAdmin, MailController.sendMail);
router.post("/new", IsAdmin, sendNew);
router.post("/create-mail-account", IsAdmin, MailController.createMailAccount);
router.post("/restore", IsAdmin, MailController.restoreMails);
router.post(
  "/delete-permanently",
  IsAdmin,
  MailController.deleteMailsPermanently
);
router.put("/update-seen/:id", IsAdmin, MailController.updateSeen);

export default router;
