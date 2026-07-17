"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gradient" | "outline";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "gradient",
  className = "",
  ariaLabel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(springX, (v) => `${v}px`);
  const ty = useTransform(springY, (v) => `${v}px`);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-shadow " +
    (variant === "gradient"
      ? "btn-gradient "
      : "border border-charcoal/15 bg-white/50 text-charcoal hover:border-charcoal/30 ") +
    className;

  const inner = (
    <motion.span style={{ x: tx, y: ty }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.96 }}
        className={base}
        style={{ x: tx, y: ty }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      className={base}
      style={{ x: tx, y: ty }}
    >
      {inner}
    </motion.button>
  );
}
