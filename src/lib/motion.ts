import type { Transition, Variants } from "motion/react";

export const durations = {
  micro: 0.2,
  button: 0.24,
  card: 0.32,
  text: 0.55,
  section: 0.7,
  modal: 0.32,
  page: 0.4,
} as const;

export const easings = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.45, 0, 0.2, 1] as const,
};

export const springSoft: Transition = {
  type: "tween",
  duration: durations.section,
  ease: easings.out,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.section, ease: easings.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.text, ease: easings.out },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.section, ease: easings.out },
  },
};

export const slideStart: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.section, ease: easings.out },
  },
};

export const slideEnd: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.section, ease: easings.out },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.section, ease: easings.out },
  },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(12% 12% 12% 12%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: easings.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const adminFade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: easings.out },
  },
};

export const motionVariants = {
  fadeUp,
  fadeIn,
  fadeDown,
  slideStart,
  slideEnd,
  scaleReveal,
  clipReveal,
} as const;

export type MotionVariantName = keyof typeof motionVariants;
