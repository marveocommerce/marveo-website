import nodemailer from "nodemailer";
import { Resend } from "resend";

const {
  RESEND_API_KEY,
  MAIL_PROVIDER,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_FROM,
  MAIL_SENDER_NAME,
  LEADS_FROM_EMAIL,
} = process.env;

const fromAddress = LEADS_FROM_EMAIL || `${MAIL_SENDER_NAME || "Marveo"} <${MAIL_FROM || "hello@getmarveo.com"}>`;

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  // Use Resend when API key is present (required on Vercel — SMTP is blocked)
  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      text,
      replyTo,
    });
    if (error) throw new Error(error.message);
    return;
  }

  // SMTP fallback for local development
  const transporter = nodemailer.createTransport({
    host: MAIL_PROVIDER,
    port: Number(MAIL_PORT) || 465,
    secure: MAIL_SECURE === "true",
    auth: { user: MAIL_USER, pass: MAIL_PASSWORD },
    tls: { rejectUnauthorized: false },
  });
  return transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
    text,
    replyTo,
  });
}
