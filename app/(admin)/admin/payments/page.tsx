import React from "react";
import pool from "@/lib/db";
import { format } from "date-fns";
import PaymentsClient from "./PaymentsClient";

import { CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  let payments = [];

  try {
    const res = await pool.query(`
      SELECT 
        pr.id, pr.amount, pr.utr_number, pr.status, pr."createdAt", pr."reviewedAt",
        u.name as "userName", u.email as "userEmail",
        c.title as "courseTitle"
      FROM payment_requests pr
      JOIN users u ON u.id = pr."userId"
      JOIN courses c ON c.id = pr."courseId"
      ORDER BY pr."createdAt" DESC
    `);
    
    payments = res.rows;
  } catch (err) {
    console.error("Error fetching payments:", err);
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="mb-8 p-6 md:p-8 pb-0">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="h-6 w-6 text-brand-blue" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900">Manual Payments</h1>
        </div>
        <p className="font-body text-base text-ink-500">Review and approve UPI QR code payments from students</p>
      </div>

      <div className="flex-1 p-6 md:p-8">
        <PaymentsClient initialPayments={payments} />
      </div>
    </div>
  );
}
