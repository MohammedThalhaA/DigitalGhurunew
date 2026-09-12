import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStudentStreak, getRecentActivity, getLeaderboard } from "@/lib/student-data";
import { updateStreak } from "@/lib/activity-logger";
import StreakWidget from "./StreakWidget";
import LeaderboardWidget from "./LeaderboardWidget";
import RecentActivitiesWidget from "./RecentActivitiesWidget";

interface RightSidebarWrapperProps {
  children: React.ReactNode;
  justUpdated?: boolean;
}

export default async function RightSidebarWrapper({ children, justUpdated }: RightSidebarWrapperProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? parseInt(session.user.id) : null;

  let streakData = { count: 0, bestStreak: 0, days: [
    { label: "Mon", active: false }, { label: "Tue", active: false },
    { label: "Wed", active: false }, { label: "Thu", active: false },
    { label: "Fri", active: false }, { label: "Sat", active: false },
    { label: "Sun", active: false },
  ]};
  let activities: any[] = [];
  let leaderboard: any[] = [];

  let isUpdated = justUpdated || false;

  if (userId) {
    if (justUpdated === undefined) {
      // Update streak on every page load (idempotent — only changes once per day)
      const updateRes = await updateStreak(userId);
      isUpdated = updateRes?.updated || false;
    }

    // Fetch all sidebar data in parallel
    [streakData, activities, leaderboard] = await Promise.all([
      getStudentStreak(userId),
      getRecentActivity(userId),
      getLeaderboard(5),
    ]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative pb-16">
      {/* Left Content Area (70%) */}
      <div className="lg:col-span-8 lg:pr-4">
        {children}
      </div>

      {/* Right Sidebar Area (30%) */}
      <div className="lg:col-span-4">
        <div className="sticky top-[104px]">
          <StreakWidget count={streakData.count} bestStreak={streakData.bestStreak} days={streakData.days} justUpdated={isUpdated} />
          <LeaderboardWidget members={leaderboard} />
          <RecentActivitiesWidget activities={activities} />
        </div>
      </div>
    </div>
  );
}
