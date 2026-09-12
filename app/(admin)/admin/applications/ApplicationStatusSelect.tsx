"use client";

import React, { useState } from "react";
import { updateApplicationStatus } from "@/lib/actions/careers";

export default function ApplicationStatusSelect({ 
  id, 
  currentStatus 
}: { 
  id: string, 
  currentStatus: string 
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateApplicationStatus(id, e.target.value as any);
    setIsUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'REVIEWED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ACCEPTED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-ink-100 text-ink-700 border-ink-200';
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
      className={`w-full px-3 py-2 text-sm font-bold uppercase tracking-wider rounded-lg border focus:outline-none appearance-none cursor-pointer disabled:opacity-50 transition-colors ${getStatusColor(currentStatus)}`}
    >
      <option value="PENDING">Pending</option>
      <option value="REVIEWED">Reviewed</option>
      <option value="ACCEPTED">Accepted</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
}
