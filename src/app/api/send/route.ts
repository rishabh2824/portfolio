import { config } from "@/data/config";
import { z } from "zod";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function renderContactEmail({
  fullName,
  email,
  message,
}: z.infer<typeof Email>): string {
  return `
    <div>
      <h1>from: ${escapeHtml(fullName)}!</h1>
      <div>${escapeHtml(email)} sent you a message</div>
      <blockquote>${escapeHtml(message)}</blockquote>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [config.email],
        subject: "Contact me from portfolio",
        html: renderContactEmail(zodData),
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json(resendData);
  } catch {
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
