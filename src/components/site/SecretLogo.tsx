"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const TAP_WINDOW_MS = 900;

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function SecretLogo({
  className = "h-10 w-auto max-w-[150px] object-contain",
  width = 280,
  height = 180,
  priority = false,
}: Props) {
  const router = useRouter();
  const taps = useRef(0);
  const timer = useRef<number>(0);

  function onActivate() {
    window.clearTimeout(timer.current);
    taps.current += 1;
    if (taps.current >= 5) {
      taps.current = 0;
      router.push("/admin/login");
      return;
    }
    timer.current = window.setTimeout(() => {
      const count = taps.current;
      taps.current = 0;
      if (count === 1) router.push("/#home");
    }, TAP_WINDOW_MS);
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      className="min-w-0 cursor-pointer border-0 bg-transparent p-0"
      aria-label="مكتب السعدي للاستشارات القانونية والخدمات الإجرائية"
    >
      <Image
        src="/images/logo.png"
        alt="مكتب السعدي للاستشارات القانونية والخدمات الإجرائية"
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    </button>
  );
}
