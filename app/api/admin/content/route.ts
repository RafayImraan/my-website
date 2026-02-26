import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isAdminAuthorized } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const content = await getSiteContent();
    return NextResponse.json({ ok: true, content });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not load content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { content?: SiteContent };
  try {
    body = (await request.json()) as { content?: SiteContent };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid content payload" }, { status: 400 });
  }

  if (!body.content) {
    return NextResponse.json({ ok: false, error: "Missing content payload" }, { status: 400 });
  }

  try {
    await saveSiteContent(body.content);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save content. Configure persistent storage for production." },
      { status: 503 }
    );
  }
}
