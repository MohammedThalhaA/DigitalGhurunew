import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Trophy, TrendingUp, Lock } from "lucide-react";
import { getLeaderboard, getStudentStats } from "@/lib/student-data";
import { LEVEL_THRESHOLDS } from "@/lib/activity-logger";
import StreakWidget from "@/components/student/StreakWidget";
import RecentActivitiesWidget from "@/components/student/RecentActivitiesWidget";
import { getStudentStreak, getRecentActivity } from "@/lib/student-data";

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = parseInt(session.user.id);

  // Fetch all data in parallel
  const [leaderboardData, stats, streakData, activities] = await Promise.all([
    getLeaderboard(10),
    getStudentStats(userId),
    getStudentStreak(userId),
    getRecentActivity(userId),
  ]);

  // Calculate level progress
  const currentLevelThreshold = LEVEL_THRESHOLDS[stats.level - 1] || 0;
  const nextLevelThreshold = LEVEL_THRESHOLDS[stats.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const pointsToNextLevel = Math.max(0, nextLevelThreshold - stats.xpPoints);
  const levelProgress = nextLevelThreshold > currentLevelThreshold
    ? ((stats.xpPoints - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100
    : 100;

  // Build level data dynamically
  const levels = Array.from({ length: 10 }, (_, i) => {
    const lvl = i + 1;
    return {
      level: lvl,
      label: `Level ${lvl}`,
      locked: lvl > stats.level,
      active: lvl === stats.level,
      threshold: LEVEL_THRESHOLDS[i] || 0,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative pb-16">
      
      {/* Left Column Area */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        
        <div className="mb-2">
          <h1 className="heading-md text-ink-900 tracking-tight">Leaderboard</h1>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Level Card */}
          <div className="bg-white rounded-[32px] border border-ink-100 shadow-card p-6 flex items-center gap-6 relative overflow-hidden group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-blue/5 to-transparent"></div>
            
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-blue to-blue-800 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-white">{stats.level > 9 ? 'X' : ['I','II','III','IV','V','VI','VII','VIII','IX','X'][stats.level - 1]}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-amber-900">
                {stats.level}
              </div>
            </div>
            
            <div className="flex-1 relative z-10">
              <h3 className="font-display text-lg font-bold text-ink-900 mb-2">Level {stats.level}</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full" style={{ width: `${Math.min(100, levelProgress)}%` }}></div>
                </div>
                <span className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] whitespace-nowrap">
                  {pointsToNextLevel} XP to Level Up
                </span>
              </div>
            </div>
          </div>

          {/* Rank Card */}
          <div className="bg-white rounded-[32px] border border-ink-100 shadow-card p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] mb-1 relative z-10">Your Rank</h3>
            <div className="flex items-center gap-4 relative z-10">
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6 text-amber-500" />
              </div>
              <span className="font-display text-3xl font-bold text-ink-900">{stats.rank}</span>
            </div>
            <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em] mt-2">{stats.xpPoints.toLocaleString()} XP Total</p>
          </div>
        </div>

        {/* Your Progress */}
        <div className="bg-white rounded-[32px] border border-ink-100 shadow-[0_4px_20px_rgba(20,20,40,0.03)] p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
               <TrendingUp className="h-5 w-5 text-brand-blue" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-ink-900">Your Progress</h2>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">Track your growth and see the rewards for each level.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
            {levels.map((lvl) => (
              <div 
                key={lvl.level} 
                className={`flex items-center justify-between p-3 rounded-2xl border ${
                  lvl.active 
                    ? 'bg-brand-blue/5 border-brand-blue/20' 
                    : lvl.locked 
                      ? 'bg-ink-50/50 border-transparent text-ink-400' 
                      : 'bg-white border-ink-100 text-ink-900 hover:border-brand-blue/30 transition-colors cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-4">
                  {lvl.locked ? (
                    <div className="h-10 w-10 rounded-full border border-ink-200 bg-white flex items-center justify-center">
                      <Lock className="h-4 w-4 text-ink-300" />
                    </div>
                  ) : (
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-inner ${
                      lvl.active ? 'bg-gradient-to-br from-brand-blue to-blue-800 text-white' : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      {lvl.level}
                    </div>
                  )}
                  <span className={`font-bold text-sm ${lvl.active ? 'text-brand-blue' : lvl.locked ? 'text-ink-400' : 'text-ink-900'}`}>
                    {lvl.label}
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-ink-400">
                  {lvl.threshold} XP
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-[32px] border border-ink-100 shadow-card group hover:shadow-card-hover hover:border-amber-500/30 transition-all duration-300 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
               <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-ink-900">Leaderboard</h2>
              <p className="font-heading text-xs font-semibold text-ink-400 uppercase tracking-[0.15em]">Top performers based on their progress.</p>
            </div>
          </div>

          <div className="space-y-2 relative z-10">
            {leaderboardData.length === 0 ? (
              <div className="p-8 text-center text-ink-500 font-medium">
                No learners on the leaderboard yet. Complete chapters to earn XP and climb the ranks!
              </div>
            ) : (
              leaderboardData.map((member) => {
                const rankTextColors: Record<number, string> = { 1: "text-amber-700", 2: "text-slate-700", 3: "text-orange-800" };
                return (
                  <div key={member.rank} className="flex items-center gap-6 p-4 hover:bg-ink-50 rounded-2xl transition-colors border border-transparent hover:border-ink-100">
                    <span className={`w-8 text-center font-bold ${rankTextColors[member.rank] || 'text-ink-300'} ${member.rank <= 3 ? 'text-xl' : 'text-base'}`}>
                      #{member.rank}
                    </span>
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-inner ${member.color}`}>
                      {member.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-ink-900 text-base">{member.name}</p>
                    </div>
                    <span className="font-heading font-bold text-brand-blue text-sm">{member.points} XP</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Right Column Area */}
      <div className="lg:col-span-4">
        <div className="sticky top-[104px] flex flex-col gap-6">
          <StreakWidget count={streakData.count} bestStreak={streakData.bestStreak} days={streakData.days} />
          <RecentActivitiesWidget activities={activities} />
        </div>
      </div>

    </div>
  );
}
