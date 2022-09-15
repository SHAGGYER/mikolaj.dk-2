import fs from "fs";

const router = require("express").Router();
import { BillingController } from "../controllers/BillingController";
import { IsUser } from "../middleware/IsUser";

router.post("/charge", IsUser, BillingController.charger);

export default router;
