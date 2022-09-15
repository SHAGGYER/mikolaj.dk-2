const router = require("express").Router();
import {
  getMedia,
  uploadMedia,
  deleteAllMedia,
  deleteMedia,
} from "../controllers/MediaController";
import { IsAdmin } from "../middleware/IsAdmin";
import multer from "multer";
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

router.post("/", IsAdmin, upload.single("image"), uploadMedia);
router.delete("/:id", IsAdmin, deleteMedia);
router.delete("/", IsAdmin, deleteAllMedia);
router.get("/", IsAdmin, getMedia);

export default router;
