"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, Trash2, Loader2, Eye } from "lucide-react";
import { toggleBlockUser, deleteUser } from "./actions";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface UserActionsProps {
  userId: number;
  isBlocked: boolean;
}

export default function UserActions({ userId, isBlocked }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleBlock = async () => {
    setIsLoading(true);
    await toggleBlockUser(userId, isBlocked);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteUser(userId);
    setIsLoading(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
      <a
        href={`/admin/users/${userId}`}
        className="p-2 rounded-lg bg-ink-50 text-brand-blue hover:bg-brand-blue/10 transition-colors"
        title="View User Details"
      >
        <Eye className="h-4 w-4" />
      </a>
      <button
        onClick={handleToggleBlock}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
          isBlocked 
            ? "bg-green-50 text-green-600 hover:bg-green-100" 
            : "bg-red-50 text-red-600 hover:bg-red-100"
        }`}
        title={isBlocked ? "Unblock User" : "Block User"}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
          isBlocked ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />
        )}
      </button>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={isLoading}
        className="p-2 rounded-lg bg-ink-50 text-ink-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Delete User"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete User Account?"
        description="Are you sure you want to delete this user? This action cannot be undone and will permanently remove all of their data from the database."
        confirmText="Yes, delete user"
        cancelText="Cancel"
        variant="danger"
        isLoading={isLoading}
      />
    </>
  );
}
