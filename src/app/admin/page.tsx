"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminShell } from "@/components/admin/AdminShell";

type Stats = {
  total: number;
  newCount: number;
  reviewing: number;
  inProgress: number;
  completed: number;
  byService: { name: string; value: number }[];
};

function Counter({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      setN(Math.round(value * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{n}</span>;
}

export default function AdminHomePage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const cards = [
    { label: "إجمالي الطلبات", value: stats?.total ?? 0 },
    { label: "الطلبات الجديدة", value: stats?.newCount ?? 0 },
    { label: "قيد المراجعة", value: stats?.reviewing ?? 0 },
    { label: "قيد التنفيذ", value: stats?.inProgress ?? 0 },
    { label: "المكتملة", value: stats?.completed ?? 0 },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-medium">لوحة المتابعة</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.22 }}
            className="border border-[#0a1624] bg-ink-2 p-4"
          >
            <p className="text-xs text-stone">{c.label}</p>
            <p className="mt-2 text-2xl font-semibold text-brass">
              {stats ? <Counter value={c.value} /> : "—"}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 h-72 border border-[#0a1624] bg-ink-2 p-4">
        {stats?.byService?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byService}>
              <XAxis dataKey="name" hide />
              <YAxis allowDecimals={false} stroke="#64748B" />
              <Tooltip
                cursor={{ fill: "rgba(201,162,39,0.12)" }}
                contentStyle={{
                  background: "#01050b",
                  border: "1px solid #0a1624",
                  color: "#f6f3ea",
                }}
                formatter={(value) => [String(value), "العدد"]}
              />
              <Bar dataKey="value" fill="#C9A227" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="flex h-full items-center justify-center text-slate-500">
            لا توجد بيانات رسم بعد.
          </p>
        )}
      </div>
    </AdminShell>
  );
}
