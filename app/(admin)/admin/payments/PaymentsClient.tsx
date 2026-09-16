"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Check, X, Loader2, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentRequest {
  id: number;
  amount: string;
  utr_number: string;
  status: string;
  createdAt: string;
  reviewedAt: string | null;
  userName: string;
  userEmail: string;
  courseTitle: string;
}

export default function PaymentsClient({ initialPayments }: { initialPayments: PaymentRequest[] }) {
  const [payments, setPayments] = useState<PaymentRequest[]>(initialPayments);
  const [processing, setProcessing] = useState<number | null>(null);
  const router = useRouter();

  const handleAction = async (id: number, status: "APPROVED" | "REJECTED") => {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this payment?`)) return;
    
    setProcessing(id);
    
    try {
      const res = await fetch(`/api/payments/manual/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update payment status");
      }

      setPayments(payments.map(p => p.id === id ? { ...p, status, reviewedAt: new Date().toISOString() } : p));
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PENDING":
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase rounded-full">Pending</span>;
      case "APPROVED":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Approved</span>;
      case "REJECTED":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full">Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-ink-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-ink-100">
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">Student</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">Course</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">Amount</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">UTR Number</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 font-heading text-xs font-bold text-ink-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-500">
                  <div className="flex flex-col items-center justify-center">
                    <Clock className="h-10 w-10 text-ink-300 mb-3" />
                    <p className="font-medium text-lg">No manual payments yet</p>
                  </div>
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-sm text-ink-600">
                    {format(new Date(payment.createdAt), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-ink-900 text-sm">{payment.userName}</div>
                    <div className="text-xs text-ink-500">{payment.userEmail}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-sm text-ink-700">
                    {payment.courseTitle}
                  </td>
                  <td className="py-4 px-6 font-bold text-brand-blue text-sm">
                    ₹{payment.amount}
                  </td>
                  <td className="py-4 px-6 font-mono text-sm font-medium text-ink-800">
                    {payment.utr_number}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {payment.status === "PENDING" && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction(payment.id, "APPROVED")}
                          disabled={processing === payment.id}
                          className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
                          title="Approve & Enroll"
                        >
                          {processing === payment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleAction(payment.id, "REJECTED")}
                          disabled={processing === payment.id}
                          className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          {processing === payment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
