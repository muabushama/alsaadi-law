"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-paper">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-sm text-brass"
          >
            مكتب السعدي للاستشارات القانونية والخدمات الإجرائية
          </motion.p>
          <motion.h1
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-medium leading-snug text-paper sm:text-5xl"
          >
            حلول قانونية متكاملة، حماية لحقوقك، و
            <span className="text-brass">ثقة في كل خطوة</span>.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-8 text-white sm:text-lg"
          >
            يقدم مكتب السعدي للاستشارات القانونية والخدمات الإجرائية منظومة
            متكاملة من الخدمات القانونية للأفراد والشركات، تشمل الترافع ومتابعة
            القضايا بمختلف أنواعها، والاستشارات القانونية، وتأسيس الشركات،
            واستخراج التصاريح والتراخيص، من خلال فريق متخصص يحرص على تقديم
            الدعم القانوني والإجرائي وفقاً لطبيعة كل حالة.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/#request"
              className="hero-cta px-6 py-3.5 font-semibold"
            >
              تقديم طلب خدمة جديد
            </Link>
            <Link
              href="/#services"
              className="hero-cta px-6 py-3.5 font-medium"
            >
              استعراض الخدمات القانونية
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-3 border border-brass/40" />
          <Image
            src="/images/hero.jpg"
            alt="ميزان العدالة والمطرقة القانونية والكتب"
            width={900}
            height={680}
            className="relative h-auto w-full object-cover"
            priority
          />
        </motion.div>
      </div>

      <a
        href="/#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-brass"
      >
        تصفح الموقع
      </a>
    </section>
  );
}
