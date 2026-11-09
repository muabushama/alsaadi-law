"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { AdminShell } from "@/components/admin/AdminShell";
import { formServiceOptions } from "@/lib/services";
import { statusLabels, statusOrder, type RequestStatus } from "@/lib/status";

type Row = {
  id: string;
  requestNumber: string;
  createdAt: string;
  clientName: string;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  serviceType: string;
  description: string;
  status: RequestStatus;
  attachments: { id: string; originalName: string }[];
};

export default function RequestsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [items, setItems] = useState<Row[]>([]);
  const [active, setActive] = useState<Row | null>(null);
  const [legacy, setLegacy] = useState("");

  const load = useCallback(async () => {
    const params = new URLSearchParams({
      q,
      status,
      serviceType,
      sort,
      page: String(page),
    });
    const res = await fetch(`/api/admin/requests?${params}`);
    const json = await res.json();
    setItems(json.items ?? []);
    setPages(json.pages ?? 1);
  }, [q, status, serviceType, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, next: RequestStatus) {
    await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    load();
    setActive((cur) => (cur && cur.id === id ? { ...cur, status: next } : cur));
  }

  async function importLegacy() {
    const itemsJson = JSON.parse(legacy);
    await fetch("/api/admin/import-legacy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: itemsJson }),
    });
    setLegacy("");
    load();
  }

  return (
    <AdminShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-medium">إدارة الطلبات</h1>
        <div className="flex gap-2 text-sm">
          <a href="/api/admin/export?format=xlsx" className="bg-ink px-3 py-2 font-semibold text-btn">
            Excel
          </a>
          <a href="/api/admin/export?format=csv" className="bg-ink px-3 py-2 text-btn">
            CSV
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          placeholder="بحث بالاسم أو الهاتف أو رقم الطلب"
          className="border border-[#0a1624] bg-ink-2 px-3 py-2"
        />
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="border border-[#0a1624] bg-ink-2 px-3 py-2"
        >
          <option value="">كل الحالات</option>
          {statusOrder.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
        <select
          value={serviceType}
          onChange={(e) => {
            setPage(1);
            setServiceType(e.target.value);
          }}
          className="border border-[#0a1624] bg-ink-2 px-3 py-2"
        >
          <option value="">كل الخدمات</option>
          {formServiceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-[#0a1624] bg-ink-2 px-3 py-2"
        >
          <option value="desc">الأحدث أولاً</option>
          <option value="asc">الأقدم أولاً</option>
        </select>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[900px] text-right text-sm">
          <thead className="bg-ink-2 text-stone">
            <tr>
              <th className="p-3">رقم الطلب</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">العميل</th>
              <th className="p-3">الهاتف</th>
              <th className="p-3">الخدمة</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="border-t border-white/5"
              >
                <td className="p-3 font-mono text-brass">{row.requestNumber}</td>
                <td className="p-3 text-xs text-slate-400">
                  {new Date(row.createdAt).toLocaleString("ar-EG")}
                </td>
                <td className="p-3">{row.clientName}</td>
                <td className="p-3" dir="ltr">
                  {row.phone}
                </td>
                <td className="p-3">{row.serviceType}</td>
                <td className="p-3">
                  <span className="border border-wine px-2 py-1 text-xs text-brass">
                    {statusLabels[row.status]}
                  </span>
                </td>
                <td className="p-3">
                  <button type="button" className="text-brass" onClick={() => setActive(row)}>
                    عرض
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          السابق
        </button>
        <span>
          {page} / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
          التالي
        </button>
      </div>

      <details className="mt-8 rounded-2xl border border-white/10 p-4 text-sm">
        <summary className="cursor-pointer font-bold">استيراد طلبات النسخة السابقة (localStorage JSON)</summary>
        <textarea
          value={legacy}
          onChange={(e) => setLegacy(e.target.value)}
          className="mt-3 h-28 w-full border border-[#0a1624] bg-ink-2 p-3"
          placeholder='الصق المصفوفة من alsaadi_law_firm_requests'
        />
        <button type="button" onClick={importLegacy} className="mt-2 rounded-lg bg-surface px-3 py-2">
          استيراد
        </button>
      </details>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-[#0a1624] bg-ink-2 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium">{active.requestNumber}</h2>
            <p className="mt-2">{active.clientName}</p>
            <p className="text-sm text-slate-400" dir="ltr">
              {active.phone} {active.whatsapp ? ` / ${active.whatsapp}` : ""}
            </p>
            <p className="mt-2 text-sm">{active.email}</p>
            <p className="mt-4 leading-7 text-slate-300">{active.description}</p>
            <label className="mt-4 block text-sm">
              الحالة
              <select
                value={active.status}
                onChange={(e) => updateStatus(active.id, e.target.value as RequestStatus)}
                className="mt-2 w-full border border-[#0a1624] bg-ink px-3 py-2"
              >
                {statusOrder.map((s) => (
                  <option key={s} value={s}>
                    {statusLabels[s]}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-4 space-y-2">
              {active.attachments.map((a) => (
                <a
                  key={a.id}
                  href={`/api/admin/attachments/${a.id}`}
                  className="block text-sm text-brass"
                >
                  تنزيل {a.originalName}
                </a>
              ))}
            </div>
            <button type="button" className="mt-6 text-sm" onClick={() => setActive(null)}>
              إغلاق
            </button>
          </motion.div>
        </div>
      ) : null}
    </AdminShell>
  );
}
