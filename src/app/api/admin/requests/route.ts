import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import type { RequestStatus } from "@/lib/status";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const status = searchParams.get("status") as RequestStatus | null;
  const serviceType = searchParams.get("serviceType")?.trim() ?? "";
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = 10;

  const where: Prisma.RequestWhereInput = {};
  if (status) where.status = status;
  if (serviceType) where.serviceType = serviceType;
  if (q) {
    where.OR = [
      { clientName: { contains: q } },
      { phone: { contains: q } },
      { requestNumber: { contains: q } },
      { email: { contains: q } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.request.findMany({
      where,
      include: { attachments: true },
      orderBy: { createdAt: sort },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.request.count({ where }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pageSize,
    pages: Math.max(1, Math.ceil(total / pageSize)),
  });
}
