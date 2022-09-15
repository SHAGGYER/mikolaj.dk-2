import fs from "fs";

const router = require("express").Router();
import { CoursesController } from "../controllers/CoursesController";
import { IsAdmin } from "../middleware/IsAdmin";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import { IsUser } from "../middleware/IsUser";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    if (!fs.existsSync(path.join(__dirname, "../..", "lessons"))) {
      fs.mkdirSync(path.join(__dirname, "../..", "lessons"));
    }

    cb(null, path.join(__dirname, "../..", "lessons"));
  },
  filename: function (_req, file, cb) {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/lesson/current-time/:lessonId",
  IsUser,
  CoursesController.updateCurrentTime
);

router.post(
  "/upload-lesson-video",
  IsAdmin,
  upload.single("video"),
  CoursesController.uploadLessonVideo
);
router.post("/", IsAdmin, CoursesController.createCourse);
router.put(
  "/update-section-order",
  IsAdmin,
  CoursesController.updateSectionOrder
);
router.put(
  "/update-lesson-order",
  IsAdmin,
  CoursesController.updateLessonOrder
);
router.put("/section/:id", IsAdmin, CoursesController.updateSection);
router.put("/lesson/:id", IsAdmin, CoursesController.updateLesson);
router.put(
  "/lesson/latest/:userCourseId",
  IsUser,
  CoursesController.updateLatestVideo
);
router.put("/:id", IsAdmin, CoursesController.updateCourse);
router.post("/lesson", IsAdmin, CoursesController.createLesson);
router.get("/lesson/user/:lessonId", IsUser, CoursesController.getUserLesson);
router.get("/stream", CoursesController.stream);
router.get("/get-sections/:courseId", IsAdmin, CoursesController.getSections);
router.get("/get-lessons/:courseId", IsAdmin, CoursesController.getLessons);
router.get("/:id", CoursesController.getCourse);
router.get("/", CoursesController.browseCourses);
router.post("/section", IsAdmin, CoursesController.createSection);
router.post("/enroll", IsUser, CoursesController.enroll);

export default router;
