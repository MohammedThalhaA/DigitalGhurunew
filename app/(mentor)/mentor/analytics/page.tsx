import { TrendingUp, IndianRupee, Users, Clock } from "lucide-react";

export default function MentorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink-900 mb-1">Analytics</h1>
        <p className="text-ink-500">Deep dive into your performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹1,24,500" trend="+12%" icon={<IndianRupee className="h-5 w-5" />} color="text-green-600" bg="bg-green-100" />
        <StatCard title="Active Students" value="123" trend="+5%" icon={<Users className="h-5 w-5" />} color="text-brand-blue" bg="bg-brand-blue/10" />
        <StatCard title="Avg. Completion" value="64%" trend="-2%" icon={<TrendingUp className="h-5 w-5" />} color="text-brand-orange" bg="bg-brand-orange/10" />
        <StatCard title="Hours Watched" value="1,842" trend="+18%" icon={<Clock className="h-5 w-5" />} color="text-purple-600" bg="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm min-h-[300px] flex flex-col justify-center items-center">
          <p className="text-ink-400 font-bold mb-2">Revenue Chart Placeholder</p>
          <div className="w-full h-48 bg-ink-50 rounded-xl border border-ink-100 border-dashed flex items-center justify-center">
            <span className="text-ink-300 text-sm">Chart.js or Recharts will be rendered here</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm min-h-[300px] flex flex-col justify-center items-center">
          <p className="text-ink-400 font-bold mb-2">Enrollment Trends Placeholder</p>
          <div className="w-full h-48 bg-ink-50 rounded-xl border border-ink-100 border-dashed flex items-center justify-center">
            <span className="text-ink-300 text-sm">Chart.js or Recharts will be rendered here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color, bg }: { title: string, value: string, trend: string, icon: React.ReactNode, color: string, bg: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl ${bg} ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      </div>
      <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-display font-extrabold text-ink-900 mt-1">{value}</p>
    </div>
  );
}
