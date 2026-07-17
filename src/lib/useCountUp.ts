"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, duration: number): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (duration <= 0 || target <= 0) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value.toLocaleString("en-US");
}
