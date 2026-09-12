import pool from "@/lib/db";

// ─── XP POINT VALUES ───
const XP_VALUES = {
  COMPLETE_CHAPTER: 10,
  COMPLETE_COURSE: 100,
  COMMUNITY_POST: 0,
  DAILY_LOGIN: 0,
  ENROLL_COURSE: 0,
};

// ─── LEVEL THRESHOLDS ───
const LEVEL_THRESHOLDS = [0, 50, 150, 350, 600, 1000, 1500, 2200, 3000, 4000, 5500];

function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

// ─── AWARD XP ───
export async function awardXP(userId: number, action: string, points: number) {
  try {
    // Insert into leaderboard_points log
    await pool.query(
      `INSERT INTO leaderboard_points ("userId", action, points) VALUES ($1, $2, $3)`,
      [userId, action, points]
    );

    // Update user's total XP
    const res = await pool.query(
      `UPDATE users SET xp_points = COALESCE(xp_points, 0) + $1 WHERE id = $2 RETURNING xp_points`,
      [points, userId]
    );

    // Recalculate and update level
    if (res.rows.length > 0) {
      const newLevel = calculateLevel(res.rows[0].xp_points);
      await pool.query(`UPDATE users SET level = $1 WHERE id = $2`, [newLevel, userId]);
    }
  } catch (error) {
    console.warn("Failed to award XP:", error);
  }
}

// ─── LOG ACTIVITY ───
export async function logActivity(userId: number, type: string, title: string, metadata: object = {}) {
  try {
    await pool.query(
      `INSERT INTO activity_log ("userId", type, title, metadata) VALUES ($1, $2, $3, $4)`,
      [userId, type, title, JSON.stringify(metadata)]
    );
  } catch (error) {
    console.warn("Failed to log activity:", error);
  }
}

// ─── CREATE NOTIFICATION ───
export async function createNotification(
  userId: number,
  type: "info" | "success" | "alert",
  title: string,
  message: string,
  relatedUrl?: string
) {
  try {
    await pool.query(
      `INSERT INTO notifications ("userId", type, title, message, "relatedUrl") VALUES ($1, $2, $3, $4, $5)`,
      [userId, type, title, message, relatedUrl || null]
    );
  } catch (error) {
    console.warn("Failed to create notification:", error);
  }
}

// ─── UPDATE STREAK ───
export async function updateStreak(userId: number): Promise<{ updated: boolean; streak: number }> {
  try {
    const res = await pool.query(
      `SELECT last_active_date, streak_count, best_streak FROM users WHERE id = $1`,
      [userId]
    );

    if (res.rows.length === 0) return { updated: false, streak: 0 };

    const user = res.rows[0];
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const lastActive = user.last_active_date
      ? `${user.last_active_date.getFullYear()}-${String(user.last_active_date.getMonth() + 1).padStart(2, '0')}-${String(user.last_active_date.getDate()).padStart(2, '0')}`
      : null;

    if (lastActive === today) {
      // Already logged in today, no streak update needed
      return { updated: false, streak: user.streak_count || 0 };
    }

    let newStreak = 1;
    if (lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      if (lastActive === yesterdayStr) {
        // Consecutive day — increment streak
        newStreak = (user.streak_count || 0) + 1;
      }
      // else: streak broken, reset to 1
    }

    const newBest = Math.max(newStreak, user.best_streak || 0);

    await pool.query(
      `UPDATE users SET streak_count = $1, best_streak = $2, last_active_date = $3 WHERE id = $4`,
      [newStreak, newBest, today, userId]
    );

    // Log activity but do not award daily login XP per user request
    await logActivity(userId, "login", "Logged in today");

    return { updated: true, streak: newStreak };
  } catch (error) {
    console.warn("Failed to update streak:", error);
    return { updated: false, streak: 0 };
  }
}

// ─── COMPOSITE EVENTS ───

export async function onChapterComplete(userId: number, chapterTitle: string, courseTitle: string) {
  await awardXP(userId, "complete_chapter", XP_VALUES.COMPLETE_CHAPTER);
  await logActivity(userId, "complete", `Completed: ${chapterTitle}`, { course: courseTitle });
  await createNotification(userId, "success", "Chapter Completed!", `You finished "${chapterTitle}" in ${courseTitle}. Keep going!`, "/student/courses");
}

export async function onCourseComplete(userId: number, courseTitle: string, courseId: number) {
  await awardXP(userId, "complete_course", XP_VALUES.COMPLETE_COURSE);
  await logActivity(userId, "complete", `Completed course: ${courseTitle}`, { courseId });
  await createNotification(userId, "success", "🎉 Course Completed!", `Congratulations! You completed "${courseTitle}". Your certificate is now available.`, "/student/certificates");

  // Mark enrollment as completed
  await pool.query(
    `UPDATE enrollments SET progress = 100, "completedAt" = NOW() WHERE "userId" = $1 AND "courseId" = $2`,
    [userId, courseId]
  ).catch(() => {});
}

export async function onCourseEnroll(userId: number, courseTitle: string, courseId: number) {
  await awardXP(userId, "enroll_course", XP_VALUES.ENROLL_COURSE);
  await logActivity(userId, "enroll", `Enrolled in: ${courseTitle}`, { courseId });
  await createNotification(userId, "info", "New Course Started!", `You enrolled in "${courseTitle}". Let's start learning!`, `/student/learn/${courseId}`);
}

export async function onCommunityPost(userId: number, postTitle: string) {
  await awardXP(userId, "community_post", XP_VALUES.COMMUNITY_POST);
  await logActivity(userId, "post", `Posted: ${postTitle}`);
}

export { XP_VALUES, LEVEL_THRESHOLDS, calculateLevel };
