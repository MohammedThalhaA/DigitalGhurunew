"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon } from "lucide-react";

interface PhotoGalleryProps {
  title?: string;
  eyebrow?: string;
  images: { src: string; alt: string }[];
  layout?: "grid" | "slider";
}

export default function PhotoGallery({
  title,
  eyebrow,
  images,
  layout = "slider",
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-play interval effect for slider layout
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || layout === "grid" || isPaused) return;

    const interval = setInterval(() => {
      // 320px width + 16px gap = 336px step size
      const cardWidth = 336;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 15;

      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000); // Stop for 3 seconds, then slide to next image

    return () => clearInterval(interval);
  }, [images, layout, isPaused]);

  // Helper to render individual image items
  const renderImageItem = (img: { src: string; alt: string }, idx: number) => (
    <motion.button
      key={idx}
      onClick={() => setLightboxIndex(idx)}
      className="group relative h-64 w-80 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 shrink-0 shadow-md"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/25 transition-colors duration-300 flex items-end p-4">
        <span className="text-white text-xs font-heading font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg line-clamp-1 text-left w-full">
          {img.alt}
        </span>
      </div>
    </motion.button>
  );

  return (
    <section className="section-padding overflow-hidden bg-white">
      <div>
        {/* Header */}
        {(eyebrow || title) && (
          <div className="text-center mb-12 section-container">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="heading-lg font-bold text-ink-900">{title}</h2>}
          </div>
        )}

        {layout === "grid" ? (
          /* Grid Layout (Static) */
          <div className="section-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <motion.button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        ) : (
          /* Slider Layout (Snapping Carousel with Autoplay Interval) */
          <div 
            className="section-container relative py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none scrollbar-hide py-2"
            >
              {images.map((img, idx) => (
                <div key={idx} className="snap-start shrink-0">
                  {renderImageItem(img, idx)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 p-4"
              onClick={() => setLightboxIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-12 right-0 text-white hover:text-brand-gold transition-colors p-2"
                  aria-label="Close lightbox"
                >
                  <XIcon className="h-8 w-8" />
                </button>
                <img
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
