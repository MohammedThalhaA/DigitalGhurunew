"use client";

import React, { useState } from "react";
import { updateApplicationStatus } from "@/lib/actions/careers";
import { ChevronDown, Loader2 } from "lucide-react";

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
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100';
      case 'REVIEWED': return 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100';
      case 'ACCEPTED': return 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100';
      case 'REJECTED': return 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100';
      default: return 'bg-ink-50 text-ink-600 border-ink-200 hover:bg-ink-100';
    }
  };

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isUpdating}
        className={`w-full pl-4 pr-10 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl border focus:outline-none appearance-none cursor-pointer disabled:opacity-50 transition-all shadow-sm focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue ${getStatusColor(currentStatus)}`}
      >
        <option value="PENDING">Pending</option>
        <option value="REVIEWED">Reviewed</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </div>
    </div>
  );
}
