import express from "express";
import { TrainingDayController } from "../controllers/TrainingDayController";
import { IsAdmin } from "../middleware/IsAdmin";

const router = express.Router();

router.post("/", IsAdmin, TrainingDayController.create);

router.get("/", TrainingDayController.browse);

router.put("/:id", IsAdmin, TrainingDayController.update);

export default router;
