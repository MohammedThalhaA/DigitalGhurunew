"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon } from "lucide-react";

interface PhotoGalleryProps {
  title?: string;
  eyebrow?: string;
  images: { src: string; alt: string }[];
}

export default function PhotoGallery({
  title,
  eyebrow,
  images,
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        {(eyebrow || title) && (
          <div className="text-center mb-12">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="heading-lg">{title}</h2>}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                className="relative max-w-4xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-12 right-0 text-white hover:text-brand-gold transition-colors"
                  aria-label="Close lightbox"
                >
                  <XIcon className="h-8 w-8" />
                </button>
                <img
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  className="w-full h-full object-contain rounded-xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
