import nodemailer from "nodemailer";
import envVariables from "./env.config";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envVariables.SMTP_USER as string,
      pass: envVariables.SMTP_PASS as string,
    },
  });

  await transporter.sendMail({
    from: `"Gear UP" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
