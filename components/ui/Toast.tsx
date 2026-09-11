"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (type: ToastType, title: string, description?: string, duration?: number) => void;
  success: (title: string, description?: string, duration?: number) => void;
  error: (title: string, description?: string, duration?: number) => void;
  warning: (title: string, description?: string, duration?: number) => void;
  info: (title: string, description?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Sparkles
};

const TOAST_THEMES = {
  success: {
    bgBadge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "shadow-emerald-500/10",
    barColor: "bg-emerald-500",
    titleColor: "text-ink-900"
  },
  error: {
    bgBadge: "bg-red-500/10 text-red-600 border-red-500/20",
    border: "border-red-500/20 hover:border-red-500/40",
    glow: "shadow-red-500/10",
    barColor: "bg-red-500",
    titleColor: "text-ink-900"
  },
  warning: {
    bgBadge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    border: "border-amber-500/20 hover:border-amber-500/40",
    glow: "shadow-amber-500/10",
    barColor: "bg-amber-500",
    titleColor: "text-ink-900"
  },
  info: {
    bgBadge: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    border: "border-brand-blue/20 hover:border-brand-blue/40",
    glow: "shadow-brand-blue/10",
    barColor: "bg-brand-blue",
    titleColor: "text-ink-900"
  }
};

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const duration = toast.duration || 4000;
  const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
  const Icon = TOAST_ICONS[toast.type] || Info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl border bg-white/95 backdrop-blur-xl p-4 shadow-xl ${theme.glow} ${theme.border} transition-all duration-300`}
    >
      <div className="flex items-start gap-3.5">
        {/* Themed Icon Badge */}
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${theme.bgBadge} shadow-xs`}>
          <Icon className="h-5 w-5 stroke-[2.2]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className={`font-heading text-sm font-bold tracking-tight ${theme.titleColor}`}>
            {toast.title}
          </h4>
          {toast.description && (
            <p className="mt-1 font-body text-xs text-ink-500 leading-relaxed">
              {toast.description}
            </p>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors"
          title="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Subtle Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-1 ${theme.barColor} opacity-80`}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, description?: string, duration?: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, description, duration }]);
    },
    []
  );

  const success = useCallback(
    (title: string, description?: string, duration?: number) => {
      showToast("success", title, description, duration);
    },
    [showToast]
  );

  const error = useCallback(
    (title: string, description?: string, duration?: number) => {
      showToast("error", title, description, duration);
    },
    [showToast]
  );

  const warning = useCallback(
    (title: string, description?: string, duration?: number) => {
      showToast("warning", title, description, duration);
    },
    [showToast]
  );

  const info = useCallback(
    (title: string, description?: string, duration?: number) => {
      showToast("info", title, description, duration);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, success, error, warning, info, removeToast }}>
      {children}

      {/* Floating Toast Container */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed top-5 right-5 z-[99999] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
