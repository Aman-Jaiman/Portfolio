import { Router } from "express";
import {
  listProjects,
  listAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

router.get("/", listProjects);
router.get("/all", requireAdmin, listAllProjects);
router.post("/", requireAdmin, createProject);
router.put("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;
