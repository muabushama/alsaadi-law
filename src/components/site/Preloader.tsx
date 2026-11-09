"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const seen = sessionStorage.getItem("alsaadi-preloader");
    if (seen) return;
    setShow(true);
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("alsaadi-preloader", "1");
    }, 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/images/logo.png"
            alt="مكتب السعدي"
            width={420}
            height={270}
            className="h-auto w-[min(72vw,360px)] object-contain"
            priority
          />
          <motion.div
            className="mx-auto mt-6 h-px w-40 origin-right bg-wine"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
