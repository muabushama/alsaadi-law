"use client";

import { useEffect, useState } from "react";

export function FloatingActions() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
      setShowTop(h.scrollTop > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
        <div
          className="scroll-progress h-full bg-wine"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 sm:bottom-5 sm:left-5">
        {whatsapp ? (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-lg"
            target="_blank"
            rel="noreferrer"
          >
            واتساب
          </a>
        ) : null}
        {phone ? (
          <a href={`tel:${phone}`} className="bg-ink px-3 py-2 text-xs font-semibold text-btn">
            اتصال
          </a>
        ) : null}
        {showTop ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-ink px-3 py-2 text-xs text-btn"
          >
            أعلى
          </button>
        ) : null}
      </div>
    </>
  );
}
