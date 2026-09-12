"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ClipboardList, X, CheckCircle2, FileText } from "lucide-react";
import { submitLead } from "@/lib/actions/leads";

export function useCourseGate(courseTitle: string) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Sync state with localStorage on mount
  useEffect(() => {
    const submitted = localStorage.getItem("dg_lead_submitted");
    if (submitted === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const triggerAction = (callback: () => void) => {
    // If already submitted, execute immediately
    if (isUnlocked || localStorage.getItem("dg_lead_submitted") === "true") {
      callback();
    } else {
      // Store the callback to execute after successful form submission
      setPendingCallback(() => callback);
      setShowModal(true);
    }
  };

  const handleSuccess = () => {
    localStorage.setItem("dg_lead_submitted", "true");
    setIsUnlocked(true);
    setShowModal(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  const GateModalComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successScreen, setSuccessScreen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg("");

      if (!name.trim() || !email.trim() || !phone.trim()) {
        setErrorMsg("All fields are required.");
        return;
      }

      if (phone.trim().length < 10) {
        setErrorMsg("Please enter a valid 10-digit phone number.");
        return;
      }

      setIsSubmitting(true);

      const res = await submitLead({ name, email, phone, courseTitle });
      
      setIsSubmitting(false);
      
      if (res.success) {
        setSuccessScreen(true);
        setTimeout(() => {
          handleSuccess();
        }, 1200);
      } else {
        setErrorMsg(res.error || "Something went wrong.");
      }
    };

    return (
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-ink-100 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-ink-50 text-ink-400 hover:text-ink-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {!successScreen ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center space-y-1.5">
                    <div className="h-12 w-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto text-brand-blue mb-2 shadow-sm border border-brand-blue/20">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-black text-ink-900 tracking-tight">
                      Submit Your Details
                    </h3>
                    <p className="text-xs text-ink-400 max-w-xs mx-auto">
                      Please fill out this quick form once to view the course curriculum and download the official brochure.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 rounded-xl border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full pl-10 pr-4 py-3.5 bg-white border border-ink-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full pl-10 pr-4 py-3.5 bg-white border border-ink-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full pl-10 pr-4 py-3.5 bg-white border border-ink-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-blue text-white rounded-xl text-base font-heading font-bold shadow-md shadow-brand-blue/20 hover:bg-brand-blue/90 disabled:opacity-75 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7 animate-bounce" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      Application Submitted!
                    </h3>
                    <p className="text-xs text-ink-400 max-w-xs mx-auto">
                      Thank you! Your details have been submitted and access is starting now...
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return {
    isUnlocked,
    triggerAction,
    GateModalComponent,
  };
}
