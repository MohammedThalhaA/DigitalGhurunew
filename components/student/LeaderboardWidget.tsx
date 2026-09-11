import React from "react";
import Link from "next/link";
import { Trophy, ChevronRight } from "lucide-react";

interface LeaderboardMember {
  rank: number;
  name: string;
  initial: string;
  image?: string;
  points: number;
  level: number;
  color: string;
}

interface LeaderboardWidgetProps {
  members: LeaderboardMember[];
}

export default function LeaderboardWidget({ members }: LeaderboardWidgetProps) {
  const topMembers = members.slice(0, 3);
  const restMembers = members.slice(3);

  // Podium config for top 3
  const podiumConfig = [
    { podiumHeight: "h-32", podiumColor: "bg-amber-100", borderColor: "border-amber-400", textColor: "text-amber-700", badgeBg: "bg-amber-400", badgeText: "text-amber-900", pointsColor: "text-amber-700", xpColor: "text-amber-500" },
    { podiumHeight: "h-24", podiumColor: "bg-slate-100", borderColor: "border-slate-300", textColor: "text-slate-700", badgeBg: "bg-slate-200", badgeText: "text-slate-700", pointsColor: "text-slate-600", xpColor: "text-slate-400" },
    { podiumHeight: "h-16", podiumColor: "bg-orange-100", borderColor: "border-orange-300", textColor: "text-orange-800", badgeBg: "bg-orange-200", badgeText: "text-orange-800", pointsColor: "text-orange-700", xpColor: "text-orange-500" },
  ];

  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl border border-ink-100 mb-6 flex flex-col shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="p-6 pb-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white shadow-md flex items-center justify-center border border-ink-100/50 group-hover:scale-110 transition-transform duration-300">
             <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-ink-900 tracking-[0.15em] uppercase group-hover:text-brand-blue transition-colors duration-200">Top Learners</h3>
        </div>
        <span className="font-heading text-xs font-semibold text-amber-500 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">THIS WEEK</span>
      </div>

      {topMembers.length >= 3 ? (
        <>
          {/* Podium Section */}
          <div className="px-6 pt-8 pb-4 flex items-end justify-center gap-3 relative z-10 border-b border-ink-50">
            {/* Rank 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-3 flex flex-col items-center">
                <span className={`absolute -top-3 -right-2 ${podiumConfig[1].badgeBg} ${podiumConfig[1].badgeText} text-xs font-bold px-1.5 py-0.5 rounded-full z-10 shadow-sm border border-white`}>#2</span>
                <div className={`h-12 w-12 rounded-full ${topMembers[1].color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {topMembers[1].initial}
                </div>
                <span className="font-heading text-xs font-semibold text-ink-900 mt-2 truncate max-w-[60px]">{topMembers[1].name}</span>
              </div>
              <div className={`w-full ${podiumConfig[1].podiumHeight} ${podiumConfig[1].podiumColor} rounded-t-2xl border-t-4 ${podiumConfig[1].borderColor} flex items-center justify-center flex-col shadow-inner`}>
                <span className={`${podiumConfig[1].pointsColor} font-bold text-xs`}>{topMembers[1].points}</span>
                <span className={`${podiumConfig[1].xpColor} text-[9px] font-bold`}>XP</span>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="flex flex-col items-center flex-1 -mt-4">
              <div className="relative mb-3 flex flex-col items-center">
                <Trophy className="absolute -top-6 text-amber-400 h-6 w-6 drop-shadow-md z-10" />
                <span className={`absolute -top-3 -right-2 ${podiumConfig[0].badgeBg} ${podiumConfig[0].badgeText} text-xs font-bold px-1.5 py-0.5 rounded-full z-10 shadow-sm border border-white`}>#1</span>
                <div className={`h-14 w-14 rounded-full ${topMembers[0].color} flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_15px_rgba(245,158,11,0.4)] border-2 border-amber-300`}>
                  {topMembers[0].initial}
                </div>
                <span className="font-heading text-xs font-semibold text-ink-900 mt-2 truncate max-w-[70px]">{topMembers[0].name}</span>
              </div>
              <div className={`w-full ${podiumConfig[0].podiumHeight} ${podiumConfig[0].podiumColor} rounded-t-2xl border-t-4 ${podiumConfig[0].borderColor} flex items-center justify-center flex-col shadow-inner`}>
                <span className={`${podiumConfig[0].pointsColor} font-bold text-sm`}>{topMembers[0].points}</span>
                <span className={`${podiumConfig[0].xpColor} text-[9px] font-bold`}>XP</span>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-3 flex flex-col items-center">
                <span className={`absolute -top-3 -right-2 ${podiumConfig[2].badgeBg} ${podiumConfig[2].badgeText} text-xs font-bold px-1.5 py-0.5 rounded-full z-10 shadow-sm border border-white`}>#3</span>
                <div className={`h-12 w-12 rounded-full ${topMembers[2].color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {topMembers[2].initial}
                </div>
                <span className="font-heading text-xs font-semibold text-ink-900 mt-2 truncate max-w-[60px]">{topMembers[2].name}</span>
              </div>
              <div className={`w-full ${podiumConfig[2].podiumHeight} ${podiumConfig[2].podiumColor} rounded-t-2xl border-t-4 ${podiumConfig[2].borderColor} flex items-center justify-center flex-col shadow-inner`}>
                <span className={`${podiumConfig[2].pointsColor} font-bold text-xs`}>{topMembers[2].points}</span>
                <span className={`${podiumConfig[2].xpColor} text-[9px] font-bold`}>XP</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="px-6 py-8 text-center">
          <p className="text-sm font-medium text-ink-400">Not enough data yet. Keep learning to appear here!</p>
        </div>
      )}

      {/* Rest of the list */}
      <div className="p-3 relative z-10 flex-1">
        {restMembers.map((member) => (
          <div key={member.rank} className="flex items-center gap-4 p-3 hover:bg-ink-50 rounded-2xl transition-colors">
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold bg-ink-50 text-ink-400 border border-ink-100">
              #{member.rank}
            </div>
            <div className={`h-10 w-10 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
              {member.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm font-semibold text-ink-900 truncate">{member.name}</p>
              <p className="font-heading text-xs font-semibold text-ink-400">{member.points} XP</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link href="/student/leaderboard" className="flex items-center justify-center gap-2 p-5 border-t border-ink-50 text-xs font-bold text-brand-blue hover:text-blue-800 transition-colors bg-brand-blue/5 hover:bg-brand-blue/10 relative z-10 uppercase tracking-[0.15em] mt-auto">
        View Full Board <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
