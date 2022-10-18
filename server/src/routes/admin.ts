import { AdminController } from "../controllers/AdminController";
import express from "express";
import { IsAdmin } from "../middleware/IsAdmin";

const router = express.Router();

router.delete("/projects/:id", IsAdmin, AdminController.deleteProject);
router.put("/update-project/:id", IsAdmin, AdminController.updateProject);
router.post("/create-project", IsAdmin, AdminController.createProject);
router.get("/projects", AdminController.getProjects);
router.put(
  "/update-youtube-views",
  IsAdmin,
  AdminController.updateYoutubeViews
);
router.put(
  "/update-homepage-image",
  IsAdmin,
  AdminController.updateHomepageHeaderImage
);
router.put(
  "/update-about-platform-image",
  IsAdmin,
  AdminController.updateHomepageAboutPlatformImage
);
router.put(
  "/update-hire-image",
  IsAdmin,
  AdminController.updateHomepageHireImage
);
router.put(
  "/update-available-for-work",
  IsAdmin,
  AdminController.updateAvailableForWork
);

export default router;
