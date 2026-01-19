import express from "express";
import { UserController } from "./userController";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidation } from "./user.validate";
import { multerUpload } from "../../config/multer.config";
import { CheckRole } from "../../middleware/checkRole";
import { Role } from "./user.interface";

const router = express.Router();

router.post(
  "/create-user",
  multerUpload.single("profileImage"),
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser,
);
router.get("/get-users", UserController.getAllUsers);

router.put(
  "/update-user-by-admin",
  CheckRole(Role.ADMIN),
  multerUpload.single("profileImage"),
  validateRequest(userValidation.updateUserByAdminZodSchema),
  UserController.updateUserByAdmin,
);

export const UserRoutes = router;
