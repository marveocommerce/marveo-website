import { NextResponse } from "next/server";

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

async function sendWebhook(url: string, payload: Record<string, unknown>) {
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

async function sendLeadEmail(payload: Record<string, unknown>) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEADS_ALERT_EMAIL;

  if (!resendKey || !toEmail) {
    return false;
  }

  const kind = payload.kind === "waitlist" ? "Waiting List" : "Contact";
  const summary = [
    `Type: ${kind}`,
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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL || "Marveo Leads <onboarding@getmarveo.com>",
      to: [toEmail],
      subject: `${kind} submission from ${String(payload.email)}`,
      text: summary,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed (${response.status})`);
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

    const payload = {
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

    if (await sendLeadEmail(payload)) {
      channels.push("resend");
    }

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
