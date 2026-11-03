import React from "react";
import pool from "@/lib/db";
import BlogForm from "./BlogForm";
import { ArrowLeft, Newspaper } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlogEditPage({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  const { edit } = searchParams;
  let initialData = null;

  if (edit) {
    const res = await pool.query(`SELECT * FROM blogs WHERE slug = $1`, [edit]);
    if (res.rows.length > 0) {
      initialData = res.rows[0];
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/blogs"
          className="p-2 rounded-xl text-ink-500 hover:bg-white hover:text-brand-blue transition-colors border border-ink-100 shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink-900 mb-1 flex items-center gap-2">
            <Newspaper className="h-7 w-7 text-brand-blue" />
            {edit ? "Edit Blog Post" : "Write New Blog Post"}
          </h1>
          <p className="font-body text-base text-ink-500">
            {edit
              ? "Update article copy, cover image, and metadata."
              : "Draft and publish a new educational article or company announcement."}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-ink-100 shadow-card p-6 md:p-8">
        <BlogForm initialData={initialData} />
      </div>
    </div>
  );
}

