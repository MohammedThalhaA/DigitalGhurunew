"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import Button from "@/components/ui/Button";

interface CourseCardProps {
  format?: string;
  duration?: string;
  title: string;
  blurb: string;
  originalPrice?: string;
  discountedPrice?: string;
  ctaText?: string;
  ctaHref?: string;
  onViewDetails?: (href: string) => void;
  onDownloadBrochure?: (title: string) => void;
}

export default function CourseCard({
  format,
  duration,
  title,
  blurb,
  originalPrice,
  discountedPrice,
  ctaText = "View Details",
  ctaHref = "/contact",
  onViewDetails,
  onDownloadBrochure,
}: CourseCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(ctaHref);
    } else {
      router.push(ctaHref);
    }
  };

  const handleDownloadBrochure = () => {
    if (onDownloadBrochure) {
      onDownloadBrochure(title);
    } else {
      // Trigger brochure download fallback
      const link = document.createElement("a");
      link.href = "/digitalghuru-brochure.txt";
      link.download = `${title.replace(/\s+/g, "_")}_Brochure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex flex-col bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden h-full"
    >
      {/* Tag Row */}
      {(format || duration) && (
        <div className="flex items-center gap-3 px-6 pt-5">
          {format && (
            <span className="text-xs font-heading font-semibold text-brand-blue uppercase tracking-wider bg-brand-blue/5 px-3 py-1 rounded-full">
              {format}
            </span>
          )}
          {duration && (
            <span className="text-xs font-heading font-medium text-ink-500 bg-ink-50 px-3 py-1 rounded-full">
              {duration}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 py-5">
        <h3 className="font-display text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed mb-4 flex-1">
          {blurb}
        </p>

        {/* Price Row */}
        {(originalPrice || discountedPrice) && (
          <div className="flex items-center gap-3 mb-5">
            {originalPrice && (
              <span className="text-sm text-ink-400 line-through">
                {originalPrice}
              </span>
            )}
            {discountedPrice && (
              <span className="text-xl font-display font-bold text-brand-orange">
                {discountedPrice}
              </span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={handleViewDetails}
            className="w-full"
          >
            {ctaText}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadBrochure}
            className="w-full flex items-center justify-center gap-2 border border-brand-blue/30 text-brand-blue"
          >
            <FileText className="h-4 w-4" />
            Download Brochure
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
