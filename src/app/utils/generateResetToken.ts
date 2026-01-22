import crypto from "crypto";

export const generateResetToken = (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

  return resetToken;
};
