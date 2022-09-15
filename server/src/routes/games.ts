import express from "express";
import { routes } from "./routes";
import { IsAdmin } from "../middleware/IsAdmin";
import { GamesController } from "../controllers/GamesController";

const router = express.Router();
router.get("/", IsAdmin, GamesController.browse);
router.post("/delete", IsAdmin, GamesController.remove);
router.post("/", IsAdmin, GamesController.create);
router.put("/:id", IsAdmin, GamesController.update);
export default router;
