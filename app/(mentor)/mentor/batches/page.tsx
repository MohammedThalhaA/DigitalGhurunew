import Button from "@/components/ui/Button";
import { Users, MoreVertical, Calendar } from "lucide-react";

export default function MentorBatchesPage() {
  const dummyBatches = [
    { id: 1, name: "Jan 2026 Cohort", course: "Advanced Digital Marketing", students: 45, status: "Active", startDate: "2026-01-10" },
    { id: 2, name: "Feb 2026 Bootcamp", course: "SEO Mastery", students: 28, status: "Active", startDate: "2026-02-15" },
    { id: 3, name: "Q4 2025 Accelerated", course: "Advanced Digital Marketing", students: 50, status: "Completed", startDate: "2025-10-01" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-1">Batches</h1>
          <p className="text-ink-500">Manage your live cohorts and student groups.</p>
        </div>
        <Button variant="primary">Create New Batch</Button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-ink-50 border-b border-ink-100 text-ink-500 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Batch Name</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {dummyBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-ink-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-ink-900">{batch.name}</td>
                  <td className="px-6 py-4 text-ink-600">{batch.course}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-ink-600">
                      <Users className="h-4 w-4" />
                      <span>{batch.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-ink-600">
                      <Calendar className="h-4 w-4" />
                      <span>{batch.startDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      batch.status === "Active" ? "bg-green-100 text-green-700" : "bg-ink-100 text-ink-600"
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-ink-400 hover:text-brand-blue p-1 rounded-md hover:bg-brand-blue/10 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
