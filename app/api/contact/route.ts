import { NextRequest, NextResponse } from "next/server";
import { appendSubmission } from "@/lib/store";
import { createSubmissionIssue, isGitHubConfigured } from "@/lib/github";

export const dynamic = "force-dynamic";

type ContactBody = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const createdAt = new Date().toISOString();
  const name = String(body.name).slice(0, 200);
  const email = String(body.email).slice(0, 200);
  const message = String(body.message).slice(0, 2000);

  // Keep local copy as a fallback (dev / persistent hosting).
  await appendSubmission({
    name,
    email,
    projectType: String(body.projectType ?? "General").slice(0, 100),
    budget: String(body.budget ?? "Not set").slice(0, 50),
    message,
  });

  // Open a GitHub Issue so the owner is notified and it survives serverless.
  if (isGitHubConfigured()) {
    const result = await createSubmissionIssue({
      name,
      email,
      message,
      createdAt,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? "Failed to record submission" },
        { status: 500 }
      );
    }
    const res = NextResponse.json({ ok: true, issueUrl: result.commitUrl });
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  const res = NextResponse.json({ ok: true });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
