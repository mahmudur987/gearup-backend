import express from "express";
import { UserController } from "./userController";
import { validateRequest } from "../../middleware/validateRequest";
import { userValidation } from "./user.validate";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser,
);

export const UserRoutes = router;
