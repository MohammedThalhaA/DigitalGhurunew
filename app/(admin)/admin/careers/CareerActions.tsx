"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCareer } from "@/lib/actions/careers";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function CareerActions({ slug }: { slug: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteCareer(slug);
    setIsDeleting(false);
    setShowConfirm(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="p-2 rounded-xl text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Job Opening"
        description="Are you sure you want to delete this job opening? It will be removed from the public website immediately."
        confirmText="Delete Job"
        variant="danger"
      />
    </>
  );
}
