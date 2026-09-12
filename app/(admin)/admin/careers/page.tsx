import React from "react";
import Link from "next/link";
import pool from "@/lib/db";
import Button from "@/components/ui/Button";
import { Plus, Briefcase, MapPin, Trash2, Edit } from "lucide-react";
import CareerActions from "./CareerActions";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const res = await pool.query(`SELECT * FROM careers ORDER BY "createdAt" DESC`);
  const careers = res.rows;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">Job Openings</h1>
          <p className="font-body text-base text-ink-500">Manage career opportunities displayed on the public website.</p>
        </div>
        <Button variant="primary" href="/admin/careers/new">
          <Plus className="h-4 w-4 mr-2" />
          Create New Job
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-brand-blue" />
            Active Postings ({careers.length})
          </h2>
        </div>

        {careers.length === 0 ? (
          <div className="p-12 text-center text-ink-500">
            <p>No job openings found.</p>
          </div>
        ) : (
          <div className="divide-y divide-ink-100">
            {careers.map((job) => (
              <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-ink-50/50 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {job.isActive ? "Active" : "Draft"}
                    </span>
                    <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-900">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-500">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>Exp: {job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/careers/new?edit=${job.slug}`} className="p-2 rounded-xl text-ink-500 hover:bg-brand-blue hover:text-white transition-colors">
                    <Edit className="h-4 w-4" />
                  </Link>
                  <CareerActions slug={job.slug} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
