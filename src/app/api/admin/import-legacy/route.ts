import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

type Legacy = {
  name?: string;
  phone?: string;
  service?: string;
  notes?: string;
  date?: string;
};

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await request.json().catch(() => null);
  const items: Legacy[] = Array.isArray(body?.items) ? body.items : [];
  if (!items.length) {
    return NextResponse.json({ error: "لا توجد بيانات للاستيراد." }, { status: 400 });
  }

  let imported = 0;
  for (const item of items) {
    const clientName = String(item.name ?? "").trim();
    const phone = String(item.phone ?? "").trim();
    if (!clientName || !phone) continue;
    const stamp = Date.now().toString().slice(-6);
    await prisma.request.create({
      data: {
        requestNumber: `ALS-LEGACY-${stamp}-${imported + 1}`,
        clientName,
        phone,
        serviceType: String(item.service ?? "خدمات أخرى"),
        description: String(item.notes ?? "مستورد من النسخة السابقة"),
      },
    });
    imported += 1;
  }
  return NextResponse.json({ ok: true, imported });
}
