import React from "react";
import pool from "@/lib/db";
import { PhoneCall, Calendar, Mail, Phone, ExternalLink } from "lucide-react";
import ExportLeadsButton from "./ExportLeadsButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const res = await pool.query(`
    SELECT *
    FROM course_leads
    ORDER BY "createdAt" DESC
  `);
  const leads = res.rows;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Course Leads</h1>
          <p className="font-body text-base text-ink-500">
            Leads captured from course brochure downloads and curriculum requests.
          </p>
        </div>
        
        <ExportLeadsButton leads={leads} />
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-brand-blue" />
            Total Leads ({leads.length})
          </h2>
        </div>

        {leads.length === 0 ? (
          <div className="p-12 text-center text-ink-500">
            <p>No leads captured yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink-50/50 border-b border-ink-100 text-xs font-bold text-ink-500 uppercase tracking-wider">
                  <th className="p-4 pl-6 font-heading">Name</th>
                  <th className="p-4 font-heading">Contact Details</th>
                  <th className="p-4 font-heading">Course Interest</th>
                  <th className="p-4 pr-6 font-heading">Date Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-ink-50/30 transition-colors">
                    <td className="p-4 pl-6">
                      <span className="font-bold text-ink-900 text-sm block">
                        {lead.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-brand-blue transition-colors">
                          <Mail className="h-3 w-3 text-ink-400" /> {lead.email}
                        </a>
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-brand-blue transition-colors">
                          <Phone className="h-3 w-3 text-ink-400" /> {lead.phone}
                        </a>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold leading-tight">
                        {lead.courseTitle}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <span className="flex items-center gap-1.5 text-sm text-ink-500">
                        <Calendar className="h-4 w-4 text-ink-400" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
