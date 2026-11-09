"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  { href: "/#home", label: "الرئيسية" },
  { href: "/#about", label: "عن المكتب" },
  { href: "/#leadership", label: "الهيكل التنفيذي" },
  { href: "/#services", label: "الخدمات القانونية" },
  { href: "/#why", label: "لماذا تختارنا؟" },
  { href: "/#contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b border-brass/25 bg-ink text-paper transition-all duration-300 ${
        scrolled ? "h-[72px]" : "h-[88px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/#home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="مكتب السعدي للاستشارات القانونية والخدمات الإجرائية"
            width={280}
            height={180}
            className="h-14 w-auto max-w-[200px] object-contain sm:h-16 sm:max-w-[240px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium text-[#d4c7a0] transition-colors duration-200 hover:text-brass"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#request"
            className="bg-ink-2 px-4 py-2.5 text-sm font-semibold text-btn transition duration-200 hover:bg-ink"
          >
            تقديم طلب استشارة
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden bg-ink-2 px-3 py-2 text-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
        >
          ☰
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink-2 lg:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-paper hover:text-brass"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#request"
                onClick={() => setOpen(false)}
                className="mt-2 bg-ink-2 px-4 py-3 text-center font-semibold text-btn"
              >
                تقديم طلب استشارة
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
