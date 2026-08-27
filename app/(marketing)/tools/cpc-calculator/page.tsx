"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import { ArrowLeft, RefreshCw, Calculator } from "lucide-react";
import Link from "next/link";

export default function CpcCalculatorPage() {
  const [cost, setCost] = useState<string>("");
  const [clicks, setClicks] = useState<string>("");
  const [cpc, setCpc] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(cost);
    const clicksNum = parseFloat(clicks);

    if (costNum >= 0 && clicksNum > 0) {
      setCpc(costNum / clicksNum);
    } else {
      setCpc(null);
    }
  };

  const reset = () => {
    setCost("");
    setClicks("");
    setCpc(null);
  };

  return (
    <>
      <div className="section-container pt-8 pb-4">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools Hub
        </Link>
      </div>

      <HeroSection
        eyebrow="CPC CALCULATOR"
        title="Calculate Cost Per Click"
        titleHighlight="Instantly"
        description="Input your campaign budget and total clicks generated to determine your average Cost Per Click (CPC)."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-lg">
          <div className="bg-ink-50 rounded-3xl border border-ink-100 p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ink-200">
              <Calculator className="h-6 w-6 text-brand-blue" />
              <h2 className="font-display text-xl font-bold text-ink-900">
                Calculator Inputs
              </h2>
            </div>

            <form onSubmit={calculate} className="space-y-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-ink-700 mb-2">
                  Total Ad Spend (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-ink-700 mb-2">
                  Total Clicks Received
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={clicks}
                  onChange={(e) => setClicks(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="primary" type="submit" className="flex-1">
                  Calculate CPC
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-3 rounded-xl border border-ink-200 text-ink-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition duration-200"
                  aria-label="Reset Calculator"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </form>

            {cpc !== null && (
              <div className="mt-8 p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/20 text-center animate-scale-in">
                <p className="text-xs font-heading font-semibold text-brand-blue uppercase tracking-wider mb-2">
                  Your Average CPC
                </p>
                <p className="font-display text-4xl font-bold text-brand-blue">
                  ₹{cpc.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
