"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Trash2, HelpCircle, CheckCircle2, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

export type ConfirmVariant = "danger" | "warning" | "info" | "success";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  isLoading?: boolean;
}

const VARIANT_CONFIGS = {
  danger: {
    icon: Trash2,
    badgeBg: "bg-red-50 text-red-600 border-red-200/80",
    buttonVariant: "danger" as const,
    confirmBg: "bg-red-600 hover:bg-red-700 text-white"
  },
  warning: {
    icon: AlertTriangle,
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    buttonVariant: "primary" as const,
    confirmBg: "bg-amber-600 hover:bg-amber-700 text-white"
  },
  info: {
    icon: HelpCircle,
    badgeBg: "bg-blue-50 text-brand-blue border-brand-blue/20",
    buttonVariant: "primary" as const,
    confirmBg: "bg-brand-blue hover:bg-blue-600 text-white"
  },
  success: {
    icon: CheckCircle2,
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    buttonVariant: "primary" as const,
    confirmBg: "bg-emerald-600 hover:bg-emerald-700 text-white"
  }
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false
}: ConfirmModalProps) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.danger;
  const Icon = config.icon;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isLoading) onClose();
            }}
            className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-ink-100 z-10 space-y-6"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-5 right-5 rounded-full p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border ${config.badgeBg} shadow-xs`}>
                <Icon className="h-6 w-6 stroke-[2]" />
              </div>
              <div className="flex-1 pr-4">
                <h3 className="font-display text-lg md:text-xl font-bold text-ink-900 leading-snug">
                  {title}
                </h3>
                <p className="mt-2 font-body text-sm text-ink-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-semibold"
              >
                {cancelText}
              </Button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading text-sm font-semibold shadow-sm transition-all disabled:opacity-50 ${config.confirmBg}`}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{confirmText}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
