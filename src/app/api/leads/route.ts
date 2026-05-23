import { NextResponse } from "next/server";
import { sendMail } from "../../../lib/sendMail";
import { waitlistConfirmationEmailHTML, contactConfirmationEmailHTML } from "@/lib/emailTemplates";

type LeadKind = "contact" | "waitlist";

type LeadPayload = {
  kind: LeadKind;
  email: string;
  name?: string;
  company?: string;
  message?: string;
  intent?: string;
  inquiryType?: string;
  source?: string;
  pagePath?: string;
};

type LeadSubmission = LeadPayload & {
  ip: string;
  userAgent: string;
  createdAt: string;
};

const MAX_MESSAGE_LENGTH = 2000;

function normalizeString(value: unknown, max = 140) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendWebhook(url: string, payload: LeadSubmission) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed (${response.status})`);
  }
}


// Determine admin recipient based on inquiry type
function getAdminRecipient(kind: LeadKind, inquiryType?: string): string {
  if (kind === "waitlist") return process.env.LEADS_ALERT_EMAIL!;
  if (!inquiryType) return process.env.LEADS_ALERT_EMAIL!;
  const t = inquiryType.toLowerCase();
  if (["strategy", "consultation", "pricing", "plans"].some((x) => t.includes(x))) {
    return process.env.SALES_ALERT_EMAIL || process.env.LEADS_ALERT_EMAIL!;
  }
  if (t.includes("partnership") || t.includes("agency")) {
    return process.env.PARTNERS_ALERT_EMAIL || process.env.LEADS_ALERT_EMAIL!;
  }
  return process.env.LEADS_ALERT_EMAIL!;
}

async function sendAdminAndConfirmationEmails(payload: LeadSubmission) {
  const kindLabel = payload.kind === "waitlist" ? "Waiting List" : "Contact";
  const adminTo = getAdminRecipient(payload.kind, payload.inquiryType);
  const summary = [
    `Type: ${kindLabel}`,
    `Email: ${String(payload.email ?? "")}`,
    payload.name ? `Name: ${String(payload.name)}` : "",
    payload.company ? `Company: ${String(payload.company)}` : "",
    payload.inquiryType ? `Inquiry: ${String(payload.inquiryType)}` : "",
    payload.intent ? `Intent: ${String(payload.intent)}` : "",
    payload.source ? `Source: ${String(payload.source)}` : "",
    payload.pagePath ? `Page: ${String(payload.pagePath)}` : "",
    payload.message ? `Message: ${String(payload.message)}` : "",
    `Submitted: ${String(payload.createdAt)}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Admin alert (plain text)
  await sendMail({
    to: adminTo,
    subject: `${kindLabel} submission from ${String(payload.email)}`,
    text: summary,
    html: `<pre style="font-size:1rem;line-height:1.6;font-family:monospace;white-space:pre-wrap;">${summary}</pre>`
  });


  // Confirmation to client (HTML)
  if (payload.kind === "waitlist") {
    await sendMail({
      to: String(payload.email),
      subject: "You’re on the Marveo Waitlist!",
      html: waitlistConfirmationEmailHTML({ name: payload.name }),
      text: `Welcome${payload.name ? ", " + payload.name : ""}!\n\nYou’re officially on the Marveo waitlist! You’ll get early access updates as we roll out. — Marveo Team`,
    });
  } else {
    await sendMail({
      to: String(payload.email),
      subject: "We’ve received your message at Marveo",
      html: contactConfirmationEmailHTML({ name: payload.name }),
      text: `Thank you${payload.name ? ", " + payload.name : ""}!\n\nWe’ve received your message and the Marveo Team will be in touch soon. — Marveo Team`,
    });
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    const kind: LeadKind = body.kind === "waitlist" ? "waitlist" : "contact";
    const email = normalizeString(body.email, 180).toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }

    const name = normalizeString(body.name);
    const company = normalizeString(body.company);
    const message = normalizeString(body.message, MAX_MESSAGE_LENGTH);
    const intent = normalizeString(body.intent, 120);
    const inquiryType = normalizeString(body.inquiryType, 120);
    const source = normalizeString(body.source, 120);
    const pagePath = normalizeString(body.pagePath, 240);

    if (kind === "contact" && !name) {
      return NextResponse.json({ ok: false, error: "Name is required for contact submissions." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const payload: LeadSubmission = {
      kind,
      email,
      name: name || undefined,
      company: company || undefined,
      message: message || undefined,
      intent: intent || undefined,
      inquiryType: inquiryType || undefined,
      source: source || undefined,
      pagePath: pagePath || undefined,
      ip,
      userAgent,
      createdAt: new Date().toISOString(),
    };

    const channels: string[] = [];
    const webhookUrl =
      kind === "waitlist"
        ? process.env.WAITLIST_WEBHOOK_URL || process.env.LEADS_WEBHOOK_URL
        : process.env.LEADS_WEBHOOK_URL;

    if (webhookUrl) {
      await sendWebhook(webhookUrl, payload);
      channels.push("webhook");
    }


    await sendAdminAndConfirmationEmails(payload);
    channels.push("smtp");

    if (channels.length === 0) {
      console.info("[leads] Submission captured without external provider", payload);
      channels.push("server-log");
    }

    return NextResponse.json({ ok: true, channels });
  } catch (error) {
    console.error("[leads] Submission failed", error);
    return NextResponse.json(
      { ok: false, error: "Submission failed. Please retry or contact support directly." },
      { status: 500 }
    );
  }
}
