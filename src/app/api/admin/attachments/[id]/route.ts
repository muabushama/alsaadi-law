import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { uploadDir } from "@/lib/files";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const file = await prisma.attachment.findUnique({ where: { id } });
  if (!file) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  const full = path.join(uploadDir(), file.storedName);
  try {
    const buf = await readFile(full);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`,
      },
    });
  } catch {
    return NextResponse.json({ error: "الملف غير متوفر" }, { status: 404 });
  }
}
