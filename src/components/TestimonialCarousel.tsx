"use client";

import { useMemo } from "react";
import { SafeScene } from "./3d/SafeScene";
import { content } from "@/lib/content";

const ACCENTS = ["#ff6b6b", "#ffd93d", "#8b5cf6", "#6bcb77"];

export function TestimonialCarousel() {
  const items = useMemo(
    () =>
      (content.testimonials ?? []).map((t, i) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        accent: ACCENTS[i % ACCENTS.length],
      })),
    []
  );

  const fallback2D = (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((it, i) => (
        <figure
          key={i}
          className="card-soft rounded-3xl p-6"
          style={{ borderTop: `3px solid ${it.accent}` }}
        >
          <blockquote className="font-cormorant text-xl italic leading-relaxed text-charcoal">
            &ldquo;{it.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-charcoal">
            {it.name}
            <span className="block font-normal text-charcoal/50">
              {it.role}, {it.company}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div className="relative h-[460px] w-full">
      <SafeScene
        variant="testimonials"
        fallback={fallback2D}
        mobileFallback={fallback2D}
        className="h-full w-full"
        sceneProps={{ items }}
      />
    </div>
  );
}
