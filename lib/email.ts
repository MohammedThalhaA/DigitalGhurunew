import nodemailer from "nodemailer";
import { getPlatformSettings } from "./settings";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  let transporter;
  let isEthereal = false;

  try {
    const settings = await getPlatformSettings();

    if (settings.smtp_host && settings.smtp_user && settings.smtp_password) {
      transporter = nodemailer.createTransport({
        host: settings.smtp_host,
        port: parseInt(settings.smtp_port || "587", 10),
        secure: settings.smtp_port === "465",
        auth: {
          user: settings.smtp_user,
          pass: settings.smtp_password,
        },
      });
    } else {
      isEthereal = true;
      // Fallback to Ethereal Email for testing if no SMTP is configured
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }
  } catch (error) {
    isEthereal = true;
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Digital Ghuru" <contact@digitalghuru.in>',
    to: email,
    subject: "Verify your email - Digital Ghuru",
    html: `
      <div style="font-family: sans-serif; max-w-xl mx-auto p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
        <h2 style="color: #111827;">Welcome to Digital Ghuru!</h2>
        <p style="color: #4b5563; font-size: 16px;">Please click the button below to verify your email address and activate your account:</p>
        <div style="margin: 30px 0;">
          <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background-color:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Verify Email Address</a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link in your browser: <br> <a href="${verifyUrl}" style="color: #2563eb;">${verifyUrl}</a></p>
      </div>
    `,
  });

  if (isEthereal) {
    console.log("==========================================");
    console.log("✉️  Email Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("==========================================");
  }
};
