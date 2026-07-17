import { NextRequest, NextResponse } from "next/server";
import { appendSubmission } from "@/lib/store";

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

  const saved = await appendSubmission({
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    projectType: String(body.projectType ?? "General").slice(0, 100),
    budget: String(body.budget ?? "Not set").slice(0, 50),
    message: String(body.message).slice(0, 2000),
  });

  const res = NextResponse.json({ ok: true, saved });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}
