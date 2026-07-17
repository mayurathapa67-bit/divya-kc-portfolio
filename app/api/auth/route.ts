import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "divya2024ultimate";
const COOKIE_NAME = "divya_admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, ADMIN_PASSWORD, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export function isAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  return cookie === ADMIN_PASSWORD;
}
