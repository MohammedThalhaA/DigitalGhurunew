import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CommunityFeed from "@/components/student/community/CommunityFeed";

export const dynamic = 'force-dynamic';

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return null;
  }

  const currentTab = searchParams.tab || "all";
  const userId = parseInt(session.user.id);

  let posts: any[] = [];

  try {
    let query = `
      SELECT 
        p.id, p.title, p.content, p.likes, p.tags, p."createdAt", 
        u.name, u.role, u.image, p."userId",
        EXISTS(SELECT 1 FROM community_likes cl WHERE cl."postId" = p.id AND cl."userId" = $1) as "hasLiked",
        (SELECT COUNT(*) FROM community_replies cr WHERE cr."postId" = p.id) as comments
      FROM community_posts p
      JOIN users u ON p."userId" = u.id
    `;
    const queryParams: any[] = [userId];

    if (currentTab === "my_posts") {
      query += ` WHERE p."userId" = $1 ORDER BY p."createdAt" DESC`;
    } else if (currentTab === "trending") {
      query += ` ORDER BY p.likes DESC, p."createdAt" DESC`;
    } else {
      // Default: All Discussions
      query += ` ORDER BY p."createdAt" DESC`;
    }

    query += ` LIMIT 20`;

    const postsRes = await pool.query(query, queryParams);
    
    // Fetch replies for these posts
    const postIds = postsRes.rows.map(r => r.id);
    let allReplies: any[] = [];
    
    if (postIds.length > 0) {
      const repliesRes = await pool.query(`
        SELECT r.id, r."postId", r."userId", r.content, r."createdAt", u.name, u.role, u.image
        FROM community_replies r
        JOIN users u ON r."userId" = u.id
        WHERE r."postId" = ANY($1)
        ORDER BY r."createdAt" ASC
      `, [postIds]);
      allReplies = repliesRes.rows;
    }

    posts = postsRes.rows.map(row => {
      // Calculate basic time ago
      const diffInMs = new Date().getTime() - new Date(row.createdAt).getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      let timeAgo = diffInHours < 1 ? "Just now" : `${diffInHours} hours ago`;
      if (diffInHours > 24) timeAgo = `${Math.floor(diffInHours / 24)} days ago`;
      
      const postReplies = allReplies
        .filter(r => r.postId === row.id)
        .map(r => {
          const rDiffInMs = new Date().getTime() - new Date(r.createdAt).getTime();
          const rDiffInHours = Math.floor(rDiffInMs / (1000 * 60 * 60));
          let rTimeAgo = rDiffInHours < 1 ? "Just now" : `${rDiffInHours} hours ago`;
          if (rDiffInHours > 24) rTimeAgo = `${Math.floor(rDiffInHours / 24)} days ago`;
          
          return {
            id: r.id,
            content: r.content,
            authorName: r.name || "Student",
            authorInitial: (r.name || "S").charAt(0).toUpperCase(),
            authorImage: r.image || null,
            isMentor: r.role === 'INSTRUCTOR' || r.role === 'ADMIN',
            timeAgo: rTimeAgo,
            userId: r.userId
          };
        });

      return {
        id: row.id,
        title: row.title,
        content: row.content,
        authorName: row.name || "Student",
        authorInitial: (row.name || "S").charAt(0).toUpperCase(),
        authorImage: row.image || null,
        likes: row.likes,
        comments: parseInt(row.comments),
        timeAgo: timeAgo,
        tags: row.tags || ["Discussion"],
        isMentor: row.role === 'INSTRUCTOR' || row.role === 'ADMIN',
        hasLiked: row.hasLiked,
        userId: row.userId,
        replies: postReplies
      };
    });

  } catch (error) {
    console.warn("Failed to fetch community posts:", error);
  }

  return (
    <RightSidebarWrapper>
      <CommunityFeed initialPosts={posts} currentUserId={userId} currentTab={currentTab} />
    </RightSidebarWrapper>
  );
}
