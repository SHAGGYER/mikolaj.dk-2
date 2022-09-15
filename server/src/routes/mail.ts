const router = require("express").Router();
import {
  sendMail,
  createOrder,
  sendNew,
  MailController,
} from "../controllers/MailController";
import { IsAdmin } from "../middleware/IsAdmin";

router.post("/createOrder", createOrder);
router.post("/delete", IsAdmin, MailController.deleteMails);
router.get("/fetch-mail", IsAdmin, MailController.fetchMail);
router.get("/", IsAdmin, MailController.listEmails);
router.get("/:id", IsAdmin, MailController.getMailById);
router.post("/", IsAdmin, MailController.sendMail);
router.post("/new", IsAdmin, sendNew);
router.post("/restore", IsAdmin, MailController.restoreMails);
router.post(
  "/delete-permanently",
  IsAdmin,
  MailController.deleteMailsPermanently
);
router.put("/update-seen/:id", IsAdmin, MailController.updateSeen);

export default router;
