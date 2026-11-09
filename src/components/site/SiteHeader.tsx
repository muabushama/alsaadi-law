"use client";

import Link from "next/link";
import { SecretLogo } from "@/components/site/SecretLogo";
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 border-b border-brass/25 bg-ink text-paper"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 ${
          scrolled ? "h-16 sm:h-[72px]" : "h-[72px] sm:h-[88px]"
        }`}
      >
        <div className="min-w-0 shrink">
          <SecretLogo
            priority
            className="h-10 w-auto max-w-[150px] object-contain sm:h-14 sm:max-w-[200px] lg:h-16 lg:max-w-[240px]"
          />
        </div>

        <nav className="hidden min-w-0 items-center gap-4 xl:gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link shrink-0 text-sm font-medium text-[#d4c7a0] transition-colors duration-200 hover:text-brass"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#request"
            className="hero-cta w-auto shrink-0 px-4 py-2.5 text-sm font-semibold"
          >
            تقديم طلب استشارة
          </Link>
        </nav>

        <button
          type="button"
          className="hero-cta w-auto shrink-0 px-3 py-2 text-sm lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? "إغلاق" : "القائمة"}
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
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-3 text-paper hover:text-brass"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#request"
                onClick={() => setOpen(false)}
                className="hero-cta mt-2 w-full px-4 py-3 text-center font-semibold"
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
