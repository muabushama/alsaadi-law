import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureSchema } from "@/lib/ensure-schema";
import {
  isAllowedFile,
  MAX_FILE_BYTES,
  MAX_FILES,
  saveUpload,
} from "@/lib/files";
import { formServiceOptions } from "@/lib/services";
import { clientKey, rateLimit } from "@/lib/rate-limit";

function todayPrefix() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `ALS-${y}${m}${day}-`;
}

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request, "request"), 12, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "تم تجاوز حد الإرسال. حاول لاحقاً." }, { status: 429 });
  }

  const form = await request.formData();
  const clientName = String(form.get("clientName") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const whatsapp = String(form.get("whatsapp") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const serviceType = String(form.get("serviceType") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (!clientName || !phone || !serviceType || !description) {
    return NextResponse.json({ error: "أكمل الحقول المطلوبة." }, { status: 400 });
  }
  if (!formServiceOptions.includes(serviceType as (typeof formServiceOptions)[number])) {
    return NextResponse.json({ error: "نوع الخدمة غير صالح." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "البريد الإلكتروني غير صالح." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: "الحد الأقصى 5 ملفات." }, { status: 400 });
  }
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: `الملف ${file.name} أكبر من 8 ميجابايت.` }, { status: 400 });
    }
    if (!isAllowedFile(file)) {
      return NextResponse.json({ error: `صيغة الملف ${file.name} غير مدعومة.` }, { status: 400 });
    }
  }

  await ensureSchema();

  const prefix = todayPrefix();
  const count = await prisma.request.count({
    where: { requestNumber: { startsWith: prefix } },
  });
  const requestNumber = `${prefix}${String(count + 1).padStart(4, "0")}`;

  const saved = [];
  for (const file of files) {
    saved.push(await saveUpload(file));
  }

  const created = await prisma.request.create({
    data: {
      requestNumber,
      clientName,
      phone,
      whatsapp: whatsapp || null,
      email: email || null,
      serviceType,
      description,
      attachments: {
        create: saved,
      },
    },
  });

  return NextResponse.json({ ok: true, requestNumber: created.requestNumber }, { status: 201 });
}
