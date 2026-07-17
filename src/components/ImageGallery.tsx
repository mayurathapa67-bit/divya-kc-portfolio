"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type ImageGalleryProps = {
  images: string[];
  alt?: string;
  className?: string;
};

export function ImageGallery({ images, alt = "Project image", className = "" }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const safe = Array.isArray(images) ? images : [];

  if (safe.length === 0) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {safe.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-6 top-6 text-2xl text-ivory"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <motion.div
              className="relative aspect-[4/5] w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={safe[index]}
                alt={`${alt} ${index + 1}`}
                fill
                sizes="100vw"
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
              {safe.length > 1 && (
                <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous"
                    className="h-10 w-10 rounded-full bg-ivory/90 text-charcoal"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex((index - 1 + safe.length) % safe.length);
                    }}
                  >
                    ‹
                  </button>
                  <span className="text-sm text-ivory">
                    {index + 1} / {safe.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next"
                    className="h-10 w-10 rounded-full bg-ivory/90 text-charcoal"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex((index + 1) % safe.length);
                    }}
                  >
                    ›
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
