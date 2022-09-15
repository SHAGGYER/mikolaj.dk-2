import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

router.get("/init", AuthController.init);
router.get("/oauth/login", AuthController.oauthLogin);
router.post("/register", AuthController.register);
router.post("/admin/login", AuthController.adminLogin);
router.post("/login", AuthController.login);

export default router;
