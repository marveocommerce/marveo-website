import nodemailer from "nodemailer";

const {
  MAIL_PROVIDER,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_FROM,
  MAIL_SENDER_NAME
} = process.env;

export const transporter = nodemailer.createTransport({
  host: MAIL_PROVIDER,
  port: Number(MAIL_PORT) || 465,
  secure: MAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  return transporter.sendMail({
    from: `${MAIL_SENDER_NAME || "Marveo"} <${MAIL_FROM}>`,
    to,
    subject,
    html,
    text,
    replyTo,
  });
}
