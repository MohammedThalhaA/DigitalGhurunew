import React from "react";
import pool from "@/lib/db";
import { FileText, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import ApplicationStatusSelect from "./ApplicationStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const res = await pool.query(`
    SELECT a.*, c.title as "jobTitle" 
    FROM job_applications a 
    LEFT JOIN careers c ON a."careerSlug" = c.slug 
    ORDER BY a."createdAt" DESC
  `);
  const applications = res.rows;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Job Applications</h1>
        <p className="font-body text-base text-ink-500">Review and manage candidate applications submitted via the careers page.</p>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-blue" />
            Recent Submissions ({applications.length})
          </h2>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center text-ink-500">
            <p>No applications received yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {applications.map((app) => (
              <div key={app.id} className="p-6 flex flex-col xl:flex-row gap-6 hover:bg-ink-50/50 transition-colors">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-ink-900 text-lg">{app.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-wider">
                      {app.jobTitle || app.careerSlug || "Speculative"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500 font-medium">
                    <a href={`mailto:${app.email}`} className="hover:text-brand-blue hover:underline">{app.email}</a>
                    <span>•</span>
                    <a href={`tel:${app.phone}`} className="hover:text-brand-blue hover:underline">{app.phone}</a>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-ink-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {app.bio && (
                    <div className="pt-2">
                      <p className="text-sm text-ink-600 bg-white border border-ink-200 p-3 rounded-xl italic relative">
                        <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-ink-400 uppercase tracking-wider">Cover Note</span>
                        {app.bio}
                      </p>
                    </div>
                  )}
                </div>

                <div className="xl:w-48 shrink-0 flex flex-col gap-2 justify-center border-t xl:border-t-0 xl:border-l border-ink-100 pt-4 xl:pt-0 xl:pl-6">
                  <span className="text-xs font-bold text-ink-400 uppercase tracking-wider">Status</span>
                  <ApplicationStatusSelect id={app.id} currentStatus={app.status || 'PENDING'} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
