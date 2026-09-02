import React from "react";
import HeroSection from "@/components/sections/HeroSection";

export const metadata = {
  title: "Cancellation & Refund Policy",
  description: "Learn about the cancellation and refund policy for Digital Ghuru courses and workshops.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <HeroSection
        eyebrow="POLICIES"
        title="Cancellation & Refund"
        titleHighlight="Policy"
        description="Please review our policy regarding course cancellations, batch transfers, and registration refunds."
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="prose prose-ink space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                1. Enrollment Cancellation
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Students can request cancellation of their enrollment in any classroom or online course up to 7 days before the batch start date. A processing fee of ₹1,000 will be deducted from the initial deposit, and the remaining amount will be refunded.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                2. Refund Eligibility
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Once a batch has started, fees paid are non-refundable. For students who choose our installment plans, all pending installments must be paid according to the signed schedule. We do not issue partial refunds for students who choose to leave the program midway.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                3. Batch Transfer Policy
              </h2>
              <p className="text-ink-600 leading-relaxed">
                We understand that emergencies occur. Students may request a one-time batch transfer to a future cohort within 12 months. Batch transfer requests must be submitted in writing to admissions@digitalghuru.com at least 3 days prior to class start.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">
                4. Course Cancellation by Digital Ghuru
              </h2>
              <p className="text-ink-600 leading-relaxed">
                In the rare event that Digital Ghuru cancels a course or batch due to unforeseen circumstances, a 100% refund of the fee paid will be issued to the original payment method within 7-10 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
