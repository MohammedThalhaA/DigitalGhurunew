import React from "react";
import pool from "@/lib/db";
import { redirect } from "next/navigation";
import CareerForm from "./CareerForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminCareerEditPage({
  searchParams
}: {
  searchParams: { edit?: string };
}) {
  const { edit } = searchParams;
  let initialData = null;

  if (edit) {
    const res = await pool.query(`SELECT * FROM careers WHERE slug = $1`, [edit]);
    if (res.rows.length > 0) {
      initialData = res.rows[0];
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/careers" className="p-2 rounded-xl text-ink-500 hover:bg-white hover:text-brand-blue transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-2">
            {edit ? "Edit Job Opening" : "Create Job Opening"}
          </h1>
          <p className="font-body text-base text-ink-500">
            {edit ? "Update the details for this career listing." : "Add a new career opportunity to the public careers page."}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-8">
        <CareerForm initialData={initialData} />
      </div>
    </div>
  );
}
