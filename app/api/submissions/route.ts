import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../auth/route";
import { readSubmissions } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = await readSubmissions();
  const res = NextResponse.json({ submissions: list });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
