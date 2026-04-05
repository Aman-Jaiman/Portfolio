import { Router } from "express";
import { createMessage, listMessages } from "../controllers/messageController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

router.post("/", createMessage);
router.get("/", requireAdmin, listMessages);

export default router;
