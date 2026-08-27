"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import { ArrowLeft, RefreshCw, Calculator } from "lucide-react";
import Link from "next/link";

export default function RoiCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [investment, setInvestment] = useState<string>("");
  const [roi, setRoi] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const revNum = parseFloat(revenue);
    const invNum = parseFloat(investment);

    if (revNum >= 0 && invNum > 0) {
      const netProfit = revNum - invNum;
      setProfit(netProfit);
      setRoi((netProfit / invNum) * 100);
    } else {
      setRoi(null);
      setProfit(null);
    }
  };

  const reset = () => {
    setRevenue("");
    setInvestment("");
    setRoi(null);
    setProfit(null);
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
        eyebrow="ROI CALCULATOR"
        title="Calculate Campaign ROI"
        titleHighlight="Instantly"
        description="Calculate your Return on Investment (ROI) by comparing total investment with total revenue generated."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-lg">
          <div className="bg-ink-50 rounded-3xl border border-ink-100 p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ink-200">
              <Calculator className="h-6 w-6 text-brand-orange" />
              <h2 className="font-display text-xl font-bold text-ink-900">
                Calculator Inputs
              </h2>
            </div>

            <form onSubmit={calculate} className="space-y-6">
              <div>
                <label className="block text-sm font-heading font-semibold text-ink-700 mb-2">
                  Total Revenue Generated (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-ink-700 mb-2">
                  Total Marketing Investment (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition bg-white"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" type="submit" className="flex-1">
                  Calculate ROI
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-3 rounded-xl border border-ink-200 text-ink-500 hover:text-brand-orange hover:border-brand-orange hover:bg-brand-orange/5 transition duration-200"
                  aria-label="Reset Calculator"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </form>

            {roi !== null && profit !== null && (
              <div className="mt-8 space-y-4 animate-scale-in">
                <div className="p-4 bg-ink-100 rounded-xl text-center border border-ink-250">
                  <p className="text-xs font-heading font-semibold text-ink-600 uppercase tracking-wider mb-1">
                    Net Profit
                  </p>
                  <p className={`font-display text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {profit >= 0 ? "+" : ""}₹{profit.toLocaleString()}
                  </p>
                </div>
                <div className={`p-6 rounded-2xl border text-center ${
                  roi >= 0 ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                }`}>
                  <p className="text-xs font-heading font-semibold uppercase tracking-wider mb-2">
                    Return on Investment
                  </p>
                  <p className="font-display text-4xl font-bold">
                    {roi.toFixed(2)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
