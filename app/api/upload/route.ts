import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "../auth/route";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured" },
      { status: 500 }
    );
  }

  let body: { file?: string; folder?: string };
  try {
    body = (await req.json()) as { file?: string; folder?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(body.file, {
      folder: body.folder ?? "divya-kc-portfolio",
      resource_type: "auto",
    });
    const res = NextResponse.json({
      ok: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
