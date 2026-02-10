import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadProfilePhoto } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.put(
  "/profile/avatar",
  verifyJWT,
  upload.single("avatar"),
  uploadProfilePhoto
);

export default router;
