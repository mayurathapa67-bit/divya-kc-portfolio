"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "How do we start working together?",
    a: "We begin with a relaxed discovery call to understand your brand, goals, and gut feel. From there I send a tailored proposal — no jargon, no fluff.",
  },
  {
    q: "Do you work with small budgets?",
    a: "Absolutely. Some of my favourite work came from tiny budgets and big ideas. Constraints are where creativity thrives.",
  },
  {
    q: "Can you lead a project end-to-end?",
    a: "Yes — from strategy and creative direction through to production and launch. I can also plug into an existing team wherever you need me.",
  },
  {
    q: "What does 'done' look like?",
    a: "Clear results you can feel and measure: a brand that feels alive, campaigns that travel, and reporting that actually makes sense.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/10 rounded-3xl card-soft px-8">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-playfair text-xl font-semibold text-charcoal">
                {item.q}
              </span>
              <span
                className={cn(
                  "ml-4 text-2xl text-coral transition-transform",
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-500",
                isOpen ? "max-h-60 pb-6" : "max-h-0"
              )}
            >
              <p className="text-base leading-relaxed text-charcoal/60">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
