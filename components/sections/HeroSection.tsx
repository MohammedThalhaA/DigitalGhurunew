"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface TrustBadge {
  label: string;
}

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  trustBadges?: TrustBadge[];
  imageUrl?: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  trustBadges,
  imageUrl,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#006FFF]">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-72px)] py-16 md:py-24">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Trust Badges */}
            {trustBadges && trustBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {trustBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center px-5 py-2 rounded-full bg-brand-gold text-ink-900 text-sm font-heading font-bold shadow-sm"
                  >
                    {badge.label}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Eyebrow */}
            {eyebrow && (
              <p className="eyebrow mb-4">{eyebrow}</p>
            )}

            {/* Title */}
            <h1 className="heading-xl text-white mb-4">
              {title}{" "}
              {titleHighlight && (
                <span className="text-brand-gold">{titleHighlight}</span>
              )}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="heading-sm text-white/90 font-normal mb-4">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="body-lg text-white/80 mb-8 max-w-xl">{description}</p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Button
                  variant="primary"
                  size="lg"
                  href={primaryCta.href}
                  onClick={primaryCta.onClick}
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  size="lg"
                  href={secondaryCta.href}
                  onClick={secondaryCta.onClick}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Image / Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {imageUrl ? (
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={imageUrl}
                  alt="Hero"
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : children ? (
              children
            ) : (
              /* Default decorative element when no image */
              <div className="aspect-square max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-brand-blue/10 via-brand-gold/5 to-brand-orange/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-display text-6xl font-bold gradient-text mb-4">DG</div>
                  <p className="font-heading text-ink-400 text-sm">
                    {/* PLACEHOLDER: Add hero image */}
                    Your future in digital marketing starts here
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
