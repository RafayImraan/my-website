import { NextResponse } from "next/server";
import { getLeads } from "@/lib/content-store";
import { isAdminAuthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json({ ok: true, leads });
}
