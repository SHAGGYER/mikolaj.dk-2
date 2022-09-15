import express from "express";
import { UserController } from "../controllers/UserController";
import { IsUser } from "../middleware/IsUser";
import { IsAdmin } from "../middleware/IsAdmin";

const router = express.Router();
router.get("/", IsAdmin, UserController.browseUsers);
router.post("/change-password", IsUser, UserController.changePassword);
router.post("/delete", IsAdmin, UserController.deleteUsers);
router.post("/", IsAdmin, UserController.createUser);
router.put("/:id", IsAdmin, UserController.updateUser);
router.delete("/:id", IsAdmin, UserController.deleteUser);

export default router;
