"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { formServiceOptions } from "@/lib/services";

type Status = "idle" | "loading" | "success" | "error";

export function RequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    files.forEach((file) => data.append("files", file));

    try {
      const res = await fetch("/api/requests", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "تعذر إرسال الطلب. حاول مرة أخرى.");
        return;
      }
      setStatus("success");
      setRequestNumber(json.requestNumber);
      setMessage("تم حفظ طلبك بنجاح. سيُراجع الفريق البيانات ويتواصل معك.");
      form.reset();
      setFiles([]);
    } catch {
      setStatus("error");
      setMessage("حدث خطأ في الاتصال. حاول لاحقاً.");
    }
  }

  return (
    <section id="request" className="bg-ink py-12 text-paper sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm text-brass">تقديم الطلب</p>
          <h2 className="mt-2 text-2xl font-medium text-paper sm:text-3xl">
            تقديم طلب استشارة أو خدمة
          </h2>
        </Reveal>
        <Reveal variant="scaleReveal">
          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-5 border border-[#0a1624] bg-ink-2 p-4 sm:mt-10 sm:p-8 md:p-10"
          >
            <Field label="الاسم بالكامل *" name="clientName" required />
            <Field label="رقم الهاتف *" name="phone" required dir="ltr" />
            <Field label="رقم واتساب (اختياري)" name="whatsapp" dir="ltr" />
            <Field label="البريد الإلكتروني (اختياري)" name="email" type="email" dir="ltr" />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#d4c7a0]">نوع الخدمة *</span>
              <select
                name="serviceType"
                required
                className="w-full border border-[#0a1624] bg-ink px-4 py-3 text-paper outline-none transition focus:border-brass"
                defaultValue=""
              >
                <option value="" disabled>
                  -- اختر نوع الخدمة --
                </option>
                {formServiceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#d4c7a0]">تفاصيل الطلب *</span>
              <textarea
                name="description"
                required
                rows={5}
                className="w-full border border-[#0a1624] bg-ink px-4 py-3 text-paper outline-none transition focus:border-brass"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#d4c7a0]">
                إرفاق مستندات (اختياري) PDF / JPG / PNG / DOC / DOCX
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))}
                className="w-full max-w-full text-sm text-stone file:ml-3 file:max-w-full file:border-0 file:bg-char file:px-3 file:py-2 file:text-brass sm:file:px-4"
              />
              {files.length > 0 ? (
                <ul className="mt-2 space-y-1 text-xs text-brass">
                  {files.map((f) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              ) : null}
            </label>
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading"}
              className="hero-cta w-full py-3.5 text-base font-semibold disabled:opacity-70 sm:py-4 sm:text-lg"
            >
              {status === "loading" ? "جارٍ الحفظ..." : "إرسال الطلب"}
            </motion.button>
            {status === "success" ? (
              <p className="border border-[#0a1624] p-4 text-center text-[#d4c7a0]">
                {message}
                {requestNumber ? (
                  <span className="mt-1 block font-mono text-brass">{requestNumber}</span>
                ) : null}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="border border-wine p-4 text-center text-brass">{message}</p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  dir,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#d4c7a0]">{label}</span>
      <input
        name={name}
        required={required}
        type={type}
        dir={dir}
        className="w-full border border-[#0a1624] bg-ink px-4 py-3 text-paper outline-none transition focus:border-brass"
      />
    </label>
  );
}
