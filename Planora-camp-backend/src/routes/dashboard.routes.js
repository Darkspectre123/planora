import express from "express";
import { getDashboardSummary, getMyProductivityStats } from "../controllers/dashboard.controller.js";
import { getTaskAnalytics ,getDueTasks, getDueProjects} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", verifyJWT, getDashboardSummary);
router.get("/task-analytics", verifyJWT, getTaskAnalytics);
router.get("/my-productivity", verifyJWT, getMyProductivityStats);
router.get("/due-tasks", verifyJWT, getDueTasks);
router.get("/due-projects", verifyJWT, getDueProjects);

export default router;

