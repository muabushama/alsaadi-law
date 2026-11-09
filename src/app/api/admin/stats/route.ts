import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureSchema } from "@/lib/ensure-schema";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await ensureSchema();

  const [total, byStatus, byService] = await Promise.all([
    prisma.request.count(),
    prisma.request.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.request.groupBy({ by: ["serviceType"], _count: { _all: true } }),
  ]);

  const statusCounts = Object.fromEntries(
    byStatus.map((s) => [s.status, s._count._all]),
  );

  return NextResponse.json({
    total,
    newCount: statusCounts.NEW ?? 0,
    reviewing: statusCounts.REVIEWING ?? 0,
    inProgress: statusCounts.IN_PROGRESS ?? 0,
    completed: statusCounts.COMPLETED ?? 0,
    contacted: statusCounts.CONTACTED ?? 0,
    closed: statusCounts.CLOSED ?? 0,
    byService: byService.map((s) => ({ name: s.serviceType, value: s._count._all })),
  });
}
