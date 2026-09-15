"use client";

import React from "react";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface ExportApplicationsButtonProps {
  applications: any[];
}

export default function ExportApplicationsButton({ applications }: ExportApplicationsButtonProps) {
  const handleExport = () => {
    if (applications.length === 0) return;

    // Build CSV content
    const headers = ["Name", "Email", "Phone", "Job Title / Role", "Status", "Date Submitted"];
    const rows = applications.map((app) => [
      `"${(app.name || "").replace(/"/g, '""')}"`,
      `"${app.email || ""}"`,
      `"${app.phone || ""}"`,
      `"${(app.jobTitle || app.careerSlug || "Speculative").replace(/"/g, '""')}"`,
      `"${app.status || "PENDING"}"`,
      `"${new Date(app.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Job_Applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={applications.length === 0}
      variant="primary"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      <span className="font-semibold text-sm">Export to CSV</span>
    </Button>
  );
}
