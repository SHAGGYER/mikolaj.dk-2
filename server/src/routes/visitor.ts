import { Router } from "express";
import { VisitorController } from "../controllers/VisitorController";
import { IsAdmin } from "../middleware/IsAdmin";

const router = Router();

router.post("/register-page-visit", VisitorController.registerPageVisit);
router.post("/update-visited-page", VisitorController.updateVisitedPage);
router.post("/reset-visitors", IsAdmin, VisitorController.resetVisitors);
router.post(
  "/update-visitor-language",
  VisitorController.updateVisitorLanguage
);

router.get("/visited-page/:id", IsAdmin, VisitorController.getVisitedPages);
router.get("/", IsAdmin, VisitorController.browseVisitors);
router.get("/visitor-stats", IsAdmin, VisitorController.getVisitorStats);

export default router;
