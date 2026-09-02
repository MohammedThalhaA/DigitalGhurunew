import { Search, Filter, MoreHorizontal, Mail } from "lucide-react";

export default function MentorStudentsPage() {
  const dummyStudents = [
    { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", course: "Advanced Digital Marketing", progress: 68, joined: "2026-01-12" },
    { id: 2, name: "Priya Patel", email: "priya.p@example.com", course: "SEO Mastery", progress: 100, joined: "2025-11-05" },
    { id: 3, name: "Amit Kumar", email: "amit.k@example.com", course: "Advanced Digital Marketing", progress: 12, joined: "2026-02-01" },
    { id: 4, name: "Neha Gupta", email: "neha.g@example.com", course: "Social Media Bootcamp", progress: 45, joined: "2026-01-20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-1">My Students</h1>
          <p className="text-ink-500">Track progress and engage with your learners.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-ink-100 flex flex-col sm:flex-row gap-4 justify-between bg-ink-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input 
              type="text" 
              placeholder="Search students by name or email..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-ink-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm text-ink-900"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-ink-200 rounded-xl text-sm font-semibold text-ink-700 bg-white hover:bg-ink-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-ink-100 text-ink-500 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {dummyStudents.map((student) => (
                <tr key={student.id} className="hover:bg-ink-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-ink-900">{student.name}</p>
                        <p className="text-xs text-ink-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-600 font-medium">{student.course}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[120px] bg-ink-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${student.progress === 100 ? 'bg-green-500' : 'bg-brand-orange'}`} 
                          style={{ width: `${student.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-ink-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-500">{student.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-ink-400 hover:text-brand-blue p-2 rounded-md hover:bg-brand-blue/10 transition-colors" title="Message Student">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="text-ink-400 hover:text-brand-blue p-2 rounded-md hover:bg-brand-blue/10 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
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
