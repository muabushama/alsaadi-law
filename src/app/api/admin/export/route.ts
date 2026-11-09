import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { statusLabels } from "@/lib/status";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const format = new URL(request.url).searchParams.get("format") || "xlsx";
  const rows = await prisma.request.findMany({
    include: { attachments: true },
    orderBy: { createdAt: "desc" },
  });

  if (format === "csv") {
    const header = [
      "رقم الطلب",
      "التاريخ",
      "الاسم",
      "الهاتف",
      "واتساب",
      "البريد",
      "الخدمة",
      "الحالة",
      "التفاصيل",
      "المرفقات",
    ];
    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.requestNumber,
          r.createdAt.toISOString(),
          csv(r.clientName),
          csv(r.phone),
          csv(r.whatsapp ?? ""),
          csv(r.email ?? ""),
          csv(r.serviceType),
          csv(statusLabels[r.status]),
          csv(r.description),
          csv(r.attachments.map((a) => a.originalName).join(" | ")),
        ].join(","),
      ),
    ];
    return new NextResponse("\uFEFF" + lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=alsaadi-requests.csv",
      },
    });
  }

  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet("الطلبات");
  sheet.columns = [
    { header: "رقم الطلب", key: "n", width: 22 },
    { header: "التاريخ", key: "d", width: 22 },
    { header: "الاسم", key: "name", width: 24 },
    { header: "الهاتف", key: "phone", width: 16 },
    { header: "واتساب", key: "wa", width: 16 },
    { header: "البريد", key: "email", width: 24 },
    { header: "الخدمة", key: "service", width: 24 },
    { header: "الحالة", key: "status", width: 16 },
    { header: "التفاصيل", key: "desc", width: 40 },
    { header: "المرفقات", key: "files", width: 30 },
  ];
  rows.forEach((r) => {
    sheet.addRow({
      n: r.requestNumber,
      d: r.createdAt.toISOString(),
      name: r.clientName,
      phone: r.phone,
      wa: r.whatsapp ?? "",
      email: r.email ?? "",
      service: r.serviceType,
      status: statusLabels[r.status],
      desc: r.description,
      files: r.attachments.map((a) => a.originalName).join(" | "),
    });
  });
  const buffer = Buffer.from(await wb.xlsx.writeBuffer());
  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=alsaadi-requests.xlsx",
    },
  });
}

function csv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
