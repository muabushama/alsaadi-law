"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error || "تعذر الدخول");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-4 text-paper">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md border border-[#0a1624] bg-ink-2 p-8"
      >
        <Image
          src="/images/logo.png"
          alt="مكتب السعدي"
          width={280}
          height={180}
          className="mx-auto mb-6 h-auto w-48 object-contain"
        />
        <h1 className="text-center text-2xl font-medium">دخول إدارة المكتب</h1>
        <p className="mt-2 text-center text-sm text-stone">لوحة متابعة الطلبات</p>
        <label className="mt-6 block text-sm">
          اسم المستخدم أو البريد
          <input
            name="username"
            required
            className="mt-2 w-full border border-[#0a1624] bg-ink px-4 py-3 outline-none focus:border-brass"
          />
        </label>
        <label className="mt-4 block text-sm">
          كلمة المرور
          <div className="relative mt-2">
            <input
              name="password"
              required
              type={show ? "text" : "password"}
              className="w-full border border-[#0a1624] bg-ink px-4 py-3 pl-16 outline-none focus:border-brass"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brass"
            >
              {show ? "إخفاء" : "إظهار"}
            </button>
          </div>
        </label>
        {error ? <p className="mt-3 text-center text-sm text-brass">{error}</p> : null}
        <button
          disabled={loading}
          className="mt-6 w-full bg-ink py-3 font-semibold text-btn disabled:opacity-70"
        >
          {loading ? "جارٍ التحقق..." : "دخول اللوحة"}
        </button>
      </motion.form>
    </main>
  );
}
