import { BarChart3, TrendingUp, Clock } from "lucide-react";

export default function LearningProgressPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="heading-md text-ink-900 tracking-tight mb-3">Learning Progress</h1>
        <p className="text-lg text-ink-500 font-medium">Track your analytics and course completion rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Average Score</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">84%</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Courses Finished</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">1</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ink-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-500 uppercase tracking-wider">Total Time</p>
            <p className="text-2xl font-display font-extrabold text-ink-900">12.5h</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-8 text-center py-16">
        <BarChart3 className="h-16 w-16 text-ink-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-ink-900 mb-2">Detailed charts coming soon</h3>
        <p className="text-ink-500 max-w-md mx-auto">
          We are building detailed analytics so you can track your study habits and module completion speeds over time.
        </p>
      </div>
    </div>
  );
}
