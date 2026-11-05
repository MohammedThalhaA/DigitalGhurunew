import nodemailer from "nodemailer";
import { getPlatformSettings } from "./settings";

/**
 * Creates and returns a nodemailer transporter based on platform_settings stored in the database.
 * Falls back to Ethereal Email in development / test environments if no SMTP settings are present.
 */
async function getEmailTransporter() {
  const settings = await getPlatformSettings();
  let transporter;
  let isEthereal = false;

  try {
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

  return { transporter, isEthereal, settings };
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  const { transporter, isEthereal } = await getEmailTransporter();

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

export const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) => {
  const { transporter, isEthereal, settings } = await getEmailTransporter();
  const toEmail = settings.support_email || "contact@digitalghuru.in";

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Digital Ghuru Website" <contact@digitalghuru.in>',
    to: toEmail,
    replyTo: email,
    subject: `New Contact Form Inquiry: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-w-xl mx-auto p-6 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
        <h2 style="color: #111827;">New Contact Form Submission</h2>
        <p style="color: #4b5563; font-size: 16px;">You have received a new message from the website contact form:</p>
        
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${subject}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #111827; margin-bottom: 10px;">Message:</h3>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.5; white-space: pre-wrap; background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">${message}</p>
        </div>
      </div>
    `,
  });

  if (isEthereal) {
    console.log("==========================================");
    console.log("✉️  Email Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("==========================================");
  }
};

export const sendLeadEmail = async ({
  name,
  email,
  phone,
  courseTitle,
  mode,
}: {
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
  mode?: string;
}) => {
  const { transporter, isEthereal, settings } = await getEmailTransporter();
  const toEmail = settings.support_email || "contact@digitalghuru.in";

  const modeText =
    mode === "online"
      ? "Live Online Interactive"
      : mode === "classroom"
      ? "Classroom (Main Campus)"
      : mode || "Not specified";

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Digital Ghuru Website" <contact@digitalghuru.in>',
    to: toEmail,
    replyTo: email,
    subject: `New Demo Seat Booking: ${courseTitle} - ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="border-bottom: 2px solid #ea580c; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 22px;">🎓 New Demo Seat Booking / Lead</h2>
          <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Received from Home Page Free Demo form</p>
        </div>
        
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 140px; color: #475569; background-color: #f1f5f9;">Full Name:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; background-color: #f1f5f9;">Email Address:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; background-color: #f1f5f9;">Phone Number:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; background-color: #f1f5f9;">Course of Interest:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #ea580c; font-weight: bold;">${courseTitle}</td>
          </tr>
          ${
            modeText
              ? `
          <tr>
            <td style="padding: 12px 16px; font-weight: 600; color: #475569; background-color: #f1f5f9;">Learning Mode:</td>
            <td style="padding: 12px 16px; color: #0f172a;">${modeText}</td>
          </tr>
          `
              : ""
          }
        </table>

        <div style="margin-top: 20px; padding: 12px 16px; background-color: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0;">
          <p style="margin: 0; font-size: 13px; color: #065f46;">
            ✓ This lead has also been saved to your <strong>Admin Portal &gt; Course Leads</strong>.
          </p>
        </div>
      </div>
    `,
  });

  if (isEthereal) {
    console.log("==========================================");
    console.log("✉️ Lead Email Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("==========================================");
  }
};
