import { NextResponse } from "next/server";
import { getRuntimeContent } from "@/lib/dynamic-profile";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getRuntimeContent();
  return NextResponse.json(data);
}
