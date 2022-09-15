import express from "express";
import { ResourceController } from "../controllers/ResourceController";
import { IsAdmin } from "../middleware/IsAdmin";

const router = express.Router();

router.post("/hobby/delete", IsAdmin, ResourceController.remove);
router.post("/hobby", IsAdmin, ResourceController.createHobby);

router.get("/hobby", ResourceController.browseHobbies);

router.put("/hobby/:id", IsAdmin, ResourceController.updateHobby);

export default router;
