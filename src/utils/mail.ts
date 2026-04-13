import nodemailer from "nodemailer";

import { config } from "../config";

const transporter = nodemailer.createTransport({
  secure: config.smtp.port === 465,
  host: config.smtp.host,
  port: config.smtp.port,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export async function sendPasswordResetEmail(
  firstName: string,
  resetUrl: string,
  to: string,
): Promise<void> {
  await transporter.sendMail({
    from: config.smtp.from,
    to,
    subject: "Reset Your MyAfriMall Password",
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1E1E2D; font-size: 24px; margin-bottom: 16px;">
          Password Reset Request
        </h2>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          Hi ${firstName},
        </p>
        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          We received a request to reset your MyAfriMall account password.
          Click the button below to set a new password. This link is valid for
          <strong>1 hour</strong>.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}"
             style="background-color: #5A65AB; color: #fff; text-decoration: none;
                    padding: 12px 32px; border-radius: 8px; font-size: 14px;
                    font-weight: 600; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #999; font-size: 12px; line-height: 1.6;">
          If you didn't request this, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 11px;">
          MyAfriMall &mdash; Seamless shipping from Nigeria to 300+ countries.
        </p>
      </div>
    `,
  });
}
