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
router.get("/get-users", CheckRole(Role.ADMIN), UserController.getAllUsers);

router.put(
  "/update-user-by-admin",
  CheckRole(Role.ADMIN),
  multerUpload.single("profileImage"),
  validateRequest(userValidation.updateUserByAdminZodSchema),
  UserController.updateUserByAdmin,
);
router.put(
  "/update-user-profile",
  CheckRole(Role.USER),
  multerUpload.single("profileImage"),
  validateRequest(userValidation.updateUser),
  UserController.updateUserProfile,
);
router.get(
  "/get-user-profile",
  CheckRole(Role.USER),
  UserController.getUserProfile,
);
export const UserRoutes = router;
