"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@/lib/types";
import { cn, PORTFOLIO_CATEGORIES } from "@/lib/utils";

type Props = { items?: PortfolioItem[] };

export function PortfolioGrid({ items = [] }: Props) {
  const [filter, setFilter] = useState<string>("All Work");
  const filtered = useMemo(
    () =>
      filter === "All Work"
        ? items
        : items.filter((p) => p.category === filter),
    [items, filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              filter === cat
                ? "btn-gradient text-charcoal"
                : "border border-charcoal/10 bg-white/50 text-charcoal/60 hover:border-charcoal/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="mb-8 break-inside-avoid"
            >
              <Link
                href={`/portfolio/${p.slug}`}
                className="group block overflow-hidden rounded-3xl card-soft transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "4 / 3" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-coral">
                    {p.client}
                  </p>
                  <h3 className="mt-2 font-playfair text-2xl font-semibold text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                    {p.description}
                  </p>
                  <div className="mt-5 flex gap-6 border-t border-charcoal/10 pt-4">
                    <Stat label="Engagement" value={p.results.engagement} />
                    <Stat label="Reach" value={p.results.reach} />
                    <Stat label="Conv." value={p.results.conversions} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-playfair text-lg font-semibold text-charcoal">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-charcoal/40">{label}</p>
    </div>
  );
}
