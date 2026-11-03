"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Edit, ExternalLink, Eye, EyeOff } from "lucide-react";
import { deleteBlog, toggleBlogPublish } from "@/lib/actions/blogs";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useRouter } from "next/navigation";

export default function BlogActions({
  slug,
  isPublished,
}: {
  slug: string;
  isPublished: boolean;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteBlog(slug);
    setIsDeleting(false);
    setShowConfirm(false);
    router.refresh();
  };

  const handleToggle = async () => {
    setIsToggling(true);
    await toggleBlogPublish(slug, !isPublished);
    setIsToggling(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {/* View Public Page */}
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        title="View live blog"
        className="p-2 rounded-xl text-ink-500 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
      >
        <ExternalLink className="h-4 w-4" />
      </Link>

      {/* Toggle Published / Draft */}
      <button
        onClick={handleToggle}
        disabled={isToggling}
        title={isPublished ? "Set to Draft" : "Publish Blog"}
        className={`p-2 rounded-xl transition-colors ${
          isPublished
            ? "text-emerald-600 hover:bg-emerald-50"
            : "text-amber-600 hover:bg-amber-50"
        }`}
      >
        {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>

      {/* Edit Blog */}
      <Link
        href={`/admin/blogs/new?edit=${slug}`}
        title="Edit Blog"
        className="p-2 rounded-xl text-ink-500 hover:bg-brand-blue hover:text-white transition-colors"
      >
        <Edit className="h-4 w-4" />
      </Link>

      {/* Delete Blog */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        title="Delete Blog"
        className="p-2 rounded-xl text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? It will be permanently removed from the website."
        confirmText="Delete Post"
        variant="danger"
      />
    </div>
  );
}

