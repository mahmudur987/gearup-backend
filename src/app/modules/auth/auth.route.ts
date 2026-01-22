import express from "express";
import { AuthController } from "./auth.controller";
import passport from "passport";

const router = express.Router();

router.post("/login", AuthController.credentialsLogIn);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

/**
 * STEP 2: Google Callback
 * GET /auth/google/callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.googleCallback,
);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password/:token", AuthController.resetPassword);

export const AuthRoutes = router;
