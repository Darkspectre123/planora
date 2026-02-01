import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controllers.js";
import {
  validateProjectPermission,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import {
  addMemberToProjectValidator,
  createProjectValidator,
} from "../validators/index.js";

import multer from "multer";
const upload = multer();


const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(upload.none(), createProjectValidator(), validate, createProject);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    upload.none(), 
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator(),
    validate,
    addMemberToProject,
  );

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
