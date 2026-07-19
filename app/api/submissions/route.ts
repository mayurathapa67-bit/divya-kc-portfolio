import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../auth/route";
import { readSubmissions } from "@/lib/store";
import { fetchSubmissionIssues, isGitHubConfigured } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isGitHubConfigured()) {
    const issues = await fetchSubmissionIssues();
    const res = NextResponse.json({ submissions: issues, source: "github" });
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  const list = await readSubmissions();
  const res = NextResponse.json({ submissions: list, source: "local" });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
