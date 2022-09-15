import express from "express";
import { routes } from "./routes";

const router = express.Router();
router.use("/admin", routes.admin);

router.use("/auth", routes.auth);
router.use("/user", routes.user);
router.use("/mail", routes.mail);
router.use("/visitor", routes.visitor);
router.use("/media", routes.media);
router.use("/resource", routes.resource);
router.use("/training", routes.trainingDay);
router.use("/games", routes.games);
router.use("/courses", routes.courses);
router.use("/billing", routes.billing);

export default router;
