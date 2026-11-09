import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { statusOrder, type RequestStatus } from "@/lib/status";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const item = await prisma.request.findUnique({
    where: { id },
    include: { attachments: true },
  });
  if (!item) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status as RequestStatus;
  if (!statusOrder.includes(status)) {
    return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
  }
  const item = await prisma.request.update({
    where: { id },
    data: { status },
    include: { attachments: true },
  });
  return NextResponse.json(item);
}
