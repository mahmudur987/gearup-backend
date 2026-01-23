import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.services";
import { createUserToken } from "../../utils/createUserToken";
import { Request, Response } from "express";
import { User } from "../user/user.model";
import { generateResetToken } from "../../utils/generateResetToken";
import { sendEmail } from "../../config/nodeMailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const credentialsLogIn = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await authService.credentialsLogIn(payload);
  res.cookie("accessToken", result.accessToken, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.cookie("refreshToken", result.refreshToken, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "user login successfully",
    data: result,
  });
});
const googleCallback = async (req: Request, res: Response) => {
  try {
    const { accessToken } = createUserToken(req.user as any);
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${accessToken}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
  }
};
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const hasLocalAuth = user?.auth?.some((a) => a.provider === "credential");
  if (!hasLocalAuth) {
    res.status(400).json({
      message: "Password reset not available for Google login accounts",
    });
    return;
  }

  const resetToken = generateResetToken(user);
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  res.json({ success: true, message: "Reset link sent to email" });
});
/**
 * POST /auth/reset-password/:token
 */
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(String(req.params.token))
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  // Ensure local auth exists
  if (!user?.auth?.some((a) => a.provider === "credential")) {
    user?.auth?.push({ provider: "local", providerId: user.email });
  }

  await user.save();

  res.json({ success: true, message: "Password reset successful" });
});
const setPasswordForGoogleUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.setPasswordForGoogleUser(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password set successfully",
      data: result,
    });
  },
);

export const AuthController = {
  credentialsLogIn,
  googleCallback,
  forgotPassword,
  resetPassword,
  setPasswordForGoogleUser,
};
