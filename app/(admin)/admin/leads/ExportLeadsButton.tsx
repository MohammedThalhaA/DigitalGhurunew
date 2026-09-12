"use client";

import React from "react";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface ExportLeadsButtonProps {
  leads: any[];
}

export default function ExportLeadsButton({ leads }: ExportLeadsButtonProps) {
  const handleExport = () => {
    if (leads.length === 0) return;

    // Build CSV content
    const headers = ["Name", "Email", "Phone", "Course Interest", "Date Submitted"];
    const rows = leads.map((lead) => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email}"`,
      `"${lead.phone}"`,
      `"${lead.courseTitle.replace(/"/g, '""')}"`,
      `"${new Date(lead.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Course_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={leads.length === 0}
      variant="outline"
      className="flex items-center gap-2 border-ink-200 text-ink-700 hover:bg-ink-50 bg-white"
    >
      <Download className="h-4 w-4" />
      <span className="font-semibold text-sm">Export to CSV</span>
    </Button>
  );
}
