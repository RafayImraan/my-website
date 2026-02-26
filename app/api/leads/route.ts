import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { addLead } from "@/lib/content-store";
import { sendLeadNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().email().max(120),
  company: z.string().trim().max(120).optional().default(""),
  interest: z.string().trim().max(120).optional().default("General Inquiry"),
  message: z.string().trim().min(5, "Message must be at least 5 characters.").max(2000)
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission payload." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
  }

  const data = parsed.data;
  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data
  };

  let persisted = true;
  try {
    await addLead(lead);
  } catch {
    persisted = false;
  }

  const emailSent = await sendLeadNotification(lead).catch(() => false);
  if (!persisted && !emailSent) {
    return NextResponse.json(
      { ok: false, error: "Could not store inquiry. Configure persistent storage for production." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, emailSent, persisted });
}
