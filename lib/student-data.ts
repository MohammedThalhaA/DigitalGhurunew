import pool from "@/lib/db";

// ─── STUDENT STATS ───
export async function getStudentStats(userId: number) {
  const defaultStats = {
    streakCount: 0,
    bestStreak: 0,
    xpPoints: 0,
    level: 1,
    totalCoursesEnrolled: 0,
    totalCoursesDone: 0,
    rank: 0,
    percentile: "0%",
  };

  try {
    // User stats
    const userRes = await pool.query(
      `SELECT streak_count, best_streak, xp_points, level, last_active_date FROM users WHERE id = $1`,
      [userId]
    );
    if (userRes.rows.length > 0) {
      const u = userRes.rows[0];
      defaultStats.streakCount = u.streak_count || 0;
      defaultStats.bestStreak = u.best_streak || 0;
      defaultStats.xpPoints = u.xp_points || 0;
      defaultStats.level = u.level || 1;
    }

    // Enrollment counts
    const enrollRes = await pool.query(
      `SELECT COUNT(*) as total, 0 as done FROM enrollments WHERE "userId" = $1`,
      [userId]
    );
    if (enrollRes.rows.length > 0) {
      defaultStats.totalCoursesEnrolled = parseInt(enrollRes.rows[0].total) || 0;
      defaultStats.totalCoursesDone = parseInt(enrollRes.rows[0].done) || 0;
    }

    // Rank (how many users have more XP than this user + 1)
    const rankRes = await pool.query(
      `SELECT COUNT(*) + 1 as rank FROM users WHERE xp_points > (SELECT COALESCE(xp_points, 0) FROM users WHERE id = $1)`,
      [userId]
    );
    defaultStats.rank = parseInt(rankRes.rows[0]?.rank) || 0;

    // Total users for percentile
    const totalUsersRes = await pool.query(`SELECT COUNT(*) as total FROM users WHERE role = 'STUDENT'`);
    const totalUsers = parseInt(totalUsersRes.rows[0]?.total) || 1;
    const percentile = Math.round(((totalUsers - defaultStats.rank) / totalUsers) * 100);
    defaultStats.percentile = `Top ${Math.max(1, 100 - percentile)}%`;

    return defaultStats;
  } catch (error) {
    console.warn("Failed to fetch student stats:", error);
    return defaultStats;
  }
}

// ─── STUDENT STREAK (weekly breakdown) ───
export async function getStudentStreak(userId: number) {
  const defaultStreak = {
    count: 0,
    bestStreak: 0,
    days: [
      { label: "Mon", active: false },
      { label: "Tue", active: false },
      { label: "Wed", active: false },
      { label: "Thu", active: false },
      { label: "Fri", active: false },
      { label: "Sat", active: false },
      { label: "Sun", active: false },
    ],
  };

  try {
    const userRes = await pool.query(
      `SELECT streak_count, best_streak FROM users WHERE id = $1`,
      [userId]
    );
    if (userRes.rows.length > 0) {
      defaultStreak.count = userRes.rows[0].streak_count || 0;
      defaultStreak.bestStreak = userRes.rows[0].best_streak || 0;
    }

    // Get activity for each day of the current week (Mon-Sun)
    const activityRes = await pool.query(
      `SELECT DISTINCT EXTRACT(ISODOW FROM "createdAt") as dow
       FROM activity_log
       WHERE "userId" = $1
         AND "createdAt" >= date_trunc('week', CURRENT_DATE)
         AND "createdAt" < date_trunc('week', CURRENT_DATE) + INTERVAL '7 days'`,
      [userId]
    );

    const activeDays = new Set(activityRes.rows.map((r: any) => parseInt(r.dow)));
    defaultStreak.days = defaultStreak.days.map((day, idx) => ({
      ...day,
      active: activeDays.has(idx + 1), // ISODOW: 1=Mon, 7=Sun
    }));

    return defaultStreak;
  } catch (error) {
    console.warn("Failed to fetch student streak:", error);
    return defaultStreak;
  }
}

// ─── NOTIFICATIONS ───
export async function getStudentNotifications(userId: number, limit = 20) {
  try {
    const res = await pool.query(
      `SELECT id, type, title, message, "isRead", "relatedUrl", "createdAt"
       FROM notifications
       WHERE "userId" = $1
       ORDER BY "createdAt" DESC
       LIMIT $2`,
      [userId, limit]
    );

    return res.rows.map((row: any) => {
      const diffMs = Date.now() - new Date(row.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      let timeAgo = "Just now";
      if (diffDays > 0) timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      else if (diffHours > 0) timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      else if (diffMins > 0) timeAgo = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;

      return {
        id: row.id,
        type: row.type, // 'info', 'success', 'alert'
        title: row.title,
        message: row.message,
        isRead: row.isRead,
        relatedUrl: row.relatedUrl,
        time: timeAgo,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch notifications:", error);
    return [];
  }
}

// ─── UNREAD NOTIFICATION COUNT ───
export async function getUnreadNotificationCount(userId: number) {
  try {
    const res = await pool.query(
      `SELECT COUNT(*) as count FROM notifications WHERE "userId" = $1 AND "isRead" = false`,
      [userId]
    );
    return parseInt(res.rows[0]?.count) || 0;
  } catch (error) {
    return 0;
  }
}

// ─── RECENT ACTIVITY ───
export async function getRecentActivity(userId: number, limit = 6) {
  try {
    const res = await pool.query(
      `SELECT id, type, title, "createdAt"
       FROM activity_log
       WHERE "userId" = $1
       ORDER BY "createdAt" DESC
       LIMIT $2`,
      [userId, limit]
    );

    return res.rows.map((row: any) => {
      const diffMs = Date.now() - new Date(row.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      let timeAgo = "Just now";
      if (diffDays > 0) timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      else if (diffHours > 0) timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      else if (diffMins > 0) timeAgo = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;

      return {
        id: row.id,
        type: row.type, // 'complete', 'enroll', 'post', 'join'
        title: row.title,
        time: timeAgo,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch recent activity:", error);
    return [];
  }
}

// ─── LEADERBOARD ───
export async function getLeaderboard(limit = 10) {
  try {
    const res = await pool.query(
      `SELECT u.id, u.name, u.image, u.xp_points, u.level
       FROM users u
       WHERE u.role = 'STUDENT' AND u.xp_points > 0
       ORDER BY u.xp_points DESC
       LIMIT $1`,
      [limit]
    );

    const colors = [
      "from-amber-400 to-amber-500",
      "from-slate-300 to-slate-400",
      "from-amber-700 to-amber-900",
      "from-brand-blue to-blue-700",
      "from-brand-orange to-orange-600",
      "from-emerald-400 to-emerald-600",
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-ink-400 to-ink-600",
    ];

    return res.rows.map((row: any, idx: number) => ({
      rank: idx + 1,
      name: row.name || "Student",
      initial: (row.name || "S").charAt(0).toUpperCase(),
      image: row.image,
      points: row.xp_points || 0,
      level: row.level || 1,
      color: `bg-gradient-to-br ${colors[idx % colors.length]}`,
    }));
  } catch (error) {
    console.warn("Failed to fetch leaderboard:", error);
    return [];
  }
}

// ─── ENROLLED COURSES WITH REAL PROGRESS ───
export async function getEnrolledCourses(userId: number) {
  try {
    const res = await pool.query(
      `SELECT 
         c.id, c.title, c.description, c."imageUrl", c.marketing_data,
         0 as progress, NULL as "completedAt",
         (SELECT COUNT(*) FROM modules m WHERE m."courseId" = c.id) as module_count,
         (SELECT COALESCE(SUM(
           CASE WHEN ch.duration ~ '^[0-9]+:[0-9]+$' 
                THEN SPLIT_PART(ch.duration, ':', 1)::int * 60 + SPLIT_PART(ch.duration, ':', 2)::int
                ELSE 600 END
         ), 0) FROM chapters ch JOIN modules m ON ch."moduleId" = m.id WHERE m."courseId" = c.id) as total_seconds
       FROM courses c
       JOIN enrollments e ON c.id = e."courseId"
       WHERE e."userId" = $1
       ORDER BY e."createdAt" DESC`,
      [userId]
    );

    return res.rows.map((row: any) => {
      const totalSecs = parseInt(row.total_seconds) || 0;
      const hours = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const timeEstimate = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      
      const mData = row.marketing_data || {};

      return {
        id: row.id.toString(),
        title: row.title || mData.title,
        description: row.description || mData.description || "",
        imageUrl: mData.cardImage || mData.thumbnail || row.imageUrl || null,
        progress: row.progress || 0,
        completedAt: row.completedAt,
        modules: parseInt(row.module_count) || 0,
        timeEstimate,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch enrolled courses:", error);
    return [];
  }
}
