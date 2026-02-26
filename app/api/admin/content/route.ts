import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";
import { isAdminAuthorized } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const content = await getSiteContent();
  return NextResponse.json({ ok: true, content });
}

export async function PUT(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { content?: SiteContent };
    if (!body.content) {
      return NextResponse.json({ ok: false, error: "Missing content payload" }, { status: 400 });
    }

    await saveSiteContent(body.content);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid content payload" }, { status: 400 });
  }
}
