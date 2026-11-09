"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/icons";
import { serviceCategories, type Service } from "@/lib/services";

function GoldCheck() {
  return (
    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brass text-[10px] font-bold text-ink">
      ✓
    </span>
  );
}

export function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-ink py-20 text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm text-brass">الخدمات</p>
          <h2 className="mt-2 text-3xl font-medium text-paper sm:text-4xl">
            الخدمات القانونية والإجرائية
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-wine" />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {serviceCategories.map((service, i) => (
            <Reveal
              key={service.slug}
              variant={i % 2 === 0 ? "slideStart" : "slideEnd"}
              delay={i * 0.04}
            >
              <motion.article
                whileHover={{ y: -4 }}
                className="service-card flex h-full min-h-[240px] flex-col-reverse overflow-hidden rounded-[28px] sm:flex-row"
              >
                <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                  <ServiceIcon
                    name={service.icon}
                    className="mb-3 h-9 w-9 self-start text-brass"
                  />
                  <h3 className="text-2xl font-semibold text-brass">{service.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/90">{service.short}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white">
                    {service.items.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <GoldCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setActive(service)}
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-brass bg-ink/60 px-4 py-2 text-sm font-semibold text-btn"
                  >
                    <span aria-hidden>‹</span>
                    تفاصيل الخدمة
                  </button>
                </div>
                <div className="relative h-44 w-full sm:h-auto sm:w-[42%]">
                  <Image
                    src={`/images/services/${service.slug}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-[#070b14] to-transparent sm:block" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#c9a227]/35 to-transparent" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-brass/40 bg-ink p-6 text-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-medium text-brass">{active.title}</h3>
              <p className="mt-3 leading-8 text-white/85">{active.details}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {active.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 border border-brass/25 px-3 py-2">
                    <GoldCheck />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/#request"
                  className="bg-ink-2 px-4 py-2 font-semibold text-btn"
                  onClick={() => setActive(null)}
                >
                  تقديم طلب
                </Link>
                <button type="button" onClick={() => setActive(null)} className="text-sm text-white/80">
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
