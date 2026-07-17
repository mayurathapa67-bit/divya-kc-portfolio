"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/lib/useCountUp";

type CounterProps = {
  value: string;
  label: string;
};

export function AnimatedCounter({ value, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numeric = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  const suffix = value.replace(/[\d.,]/g, "");
  const display = useCountUp(numeric, inView ? 1400 : 0);

  return (
    <div ref={ref} className="text-center">
      <p className="font-playfair text-5xl font-semibold text-gradient sm:text-6xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wide text-charcoal/50">{label}</p>
    </div>
  );
}
