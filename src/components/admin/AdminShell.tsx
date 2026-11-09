"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <aside className="fixed bottom-0 right-0 top-0 hidden w-60 border-l border-[#0a1624] bg-ink-2 p-5 md:block">
        <motion.div initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Image
            src="/images/logo.png"
            alt="مكتب السعدي"
            width={220}
            height={140}
            className="mb-4 h-auto w-full object-contain"
          />
          <p className="font-semibold text-brass">لوحة مكتب السعدي</p>
          <nav className="mt-6 flex flex-col gap-2 text-sm">
            <Link
              href="/admin"
              className={`px-3 py-2 ${pathname === "/admin" ? "bg-ink text-brass" : "hover:bg-ink"}`}
            >
              الإحصائيات
            </Link>
            <Link
              href="/admin/requests"
              className={`px-3 py-2 ${pathname?.startsWith("/admin/requests") ? "bg-ink text-brass" : "hover:bg-ink"}`}
            >
              الطلبات
            </Link>
            <Link href="/" className="px-3 py-2 hover:bg-ink">
              الموقع
            </Link>
            <button type="button" onClick={logout} className="px-3 py-2 text-right hover:bg-ink">
              خروج
            </button>
          </nav>
        </motion.div>
      </aside>
      <div className="md:pr-60">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 md:hidden">
          <p className="font-bold">الإدارة</p>
          <div className="flex gap-3 text-sm">
            <Link href="/admin">إحصائيات</Link>
            <Link href="/admin/requests">طلبات</Link>
          </div>
        </header>
        <div className="p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
