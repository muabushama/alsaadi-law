"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  motionVariants,
  type MotionVariantName,
} from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  variant?: MotionVariantName;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  variant = "fadeUp",
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const variants = motionVariants[variant];

  if (reduce) {
    return <div className={`reveal ${className}`}>{children}</div>;
  }

  return (
    <Comp
      className={`reveal ${className}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px", amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}
