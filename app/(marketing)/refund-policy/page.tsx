import type { Metadata } from "next";
import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Learn about the cancellation, batch transfer, and refund policy for Digital Ghuru courses and training programs.",
  alternates: {
    canonical: "https://digitalghuru.com/refund-policy",
  },
  openGraph: {
    title: "Cancellation & Refund Policy | Digital Ghuru",
    description: "Learn about the cancellation, batch transfer, and refund policy for Digital Ghuru courses and training programs.",
    url: "https://digitalghuru.com/refund-policy",
    siteName: "Digital Ghuru",
    type: "website",
    images: [
      {
        url: "https://digitalghuru.com/images/Hero Image.webp",
        width: 1200,
        height: 630,
        alt: "Cancellation & Refund Policy - Digital Ghuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy | Digital Ghuru",
    description: "Learn about the cancellation, batch transfer, and refund policy for Digital Ghuru courses and training programs.",
    images: ["https://digitalghuru.com/images/Hero Image.webp"],
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <HeroSection
        eyebrow="POLICIES"
        title="Cancellation & Refund"
        titleHighlight="Policy"
        description="Read our clear policy on cancellations, batch transfers, and course refunds."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="prose prose-ink space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                1. Enrollment Cancellation
              </h2>
              <p className="text-ink-600 leading-relaxed">
                You can cancel your course enrollment up to 7 days before classes start. We deduct a ₹1,000 processing fee. We then refund the rest to your original payment method.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                2. Refund Eligibility
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Fees cannot be refunded once a batch begins. If you pay in installments, you must complete your planned schedule. We do not offer partial refunds if you leave early.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                3. Batch Transfer Policy
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Life can be unpredictable. You can move your seat to a future batch within 12 months for free. Please email your request to <ObfuscatedEmail className="font-semibold text-brand-blue hover:underline" /> at least 3 days before classes start.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                4. Course Cancellation by Digital Ghuru
              </h2>
              <p className="text-ink-600 leading-relaxed">
                If Digital Ghuru ever cancels a batch, you receive a full 100% refund. We return your money within 7 to 10 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
