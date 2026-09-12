"use server";

import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "@/lib/activity-logger";

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return parseInt(session.user.id);
}

export async function createPost(title: string, content: string, tags: string[]) {
  const userId = await getUserId();
  
  await pool.query(
    `INSERT INTO community_posts (title, content, "userId", tags, likes) VALUES ($1, $2, $3, $4, 0)`,
    [title, content, userId, JSON.stringify(tags)]
  );
  
  revalidatePath('/student/community');
  return { success: true };
}

export async function deletePost(postId: number) {
  const userId = await getUserId();
  
  // Ensure the user owns the post (or is admin, but simple check for now)
  const res = await pool.query(`DELETE FROM community_posts WHERE id = $1 AND "userId" = $2 RETURNING id`, [postId, userId]);
  
  if (res.rowCount === 0) throw new Error("Not authorized or post not found");
  
  revalidatePath('/student/community');
  return { success: true };
}

export async function toggleLike(postId: number) {
  const userId = await getUserId();
  
  // Check if like exists
  const checkRes = await pool.query(`SELECT 1 FROM community_likes WHERE "postId" = $1 AND "userId" = $2`, [postId, userId]);
  
  if (checkRes.rowCount && checkRes.rowCount > 0) {
    // Unlike
    await pool.query(`DELETE FROM community_likes WHERE "postId" = $1 AND "userId" = $2`, [postId, userId]);
    await pool.query(`UPDATE community_posts SET likes = GREATEST(likes - 1, 0) WHERE id = $1`, [postId]);
    revalidatePath('/student/community');
    return { liked: false };
  } else {
    // Like
    await pool.query(`INSERT INTO community_likes ("postId", "userId") VALUES ($1, $2)`, [postId, userId]);
    await pool.query(`UPDATE community_posts SET likes = likes + 1 WHERE id = $1`, [postId]);
    
    // Create notification if the liker is not the post author
    const postRes = await pool.query(`
      SELECT p."userId", p.title, u.name as liker_name 
      FROM community_posts p
      LEFT JOIN users u ON u.id = $1
      WHERE p.id = $2
    `, [userId, postId]);
    
    if (postRes.rows.length > 0) {
      const { userId: postAuthorId, title, liker_name } = postRes.rows[0];
      if (postAuthorId !== userId) {
        await createNotification(
          postAuthorId,
          "info",
          "New Like",
          `${liker_name || 'Someone'} liked your post "${title}"`,
          `/student/community`
        );
      }
    }
    
    revalidatePath('/student/community');
    return { liked: true };
  }
}

export async function createReply(postId: number, content: string) {
  const userId = await getUserId();
  
  const res = await pool.query(
    `INSERT INTO community_replies ("postId", "userId", content) VALUES ($1, $2, $3) RETURNING id, "createdAt"`,
    [postId, userId, content]
  );
  
  // Create notification if the replier is not the post author
  const postRes = await pool.query(`
    SELECT p."userId", p.title, u.name as replier_name 
    FROM community_posts p
    LEFT JOIN users u ON u.id = $1
    WHERE p.id = $2
  `, [userId, postId]);
  
  if (postRes.rows.length > 0) {
    const { userId: postAuthorId, title, replier_name } = postRes.rows[0];
    if (postAuthorId !== userId) {
      await createNotification(
        postAuthorId,
        "info",
        "New Reply",
        `${replier_name || 'Someone'} replied to your post "${title}"`,
        `/student/community`
      );
    }
  }
  
  revalidatePath('/student/community');
  return { success: true, id: res.rows[0].id, createdAt: res.rows[0].createdAt };
}

export async function deleteReply(replyId: number) {
  const userId = await getUserId();
  
  const res = await pool.query(`DELETE FROM community_replies WHERE id = $1 AND "userId" = $2 RETURNING id`, [replyId, userId]);
  
  if (res.rowCount === 0) throw new Error("Not authorized or reply not found");
  
  revalidatePath('/student/community');
  return { success: true };
}
