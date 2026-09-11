import RightSidebarWrapper from "@/components/student/RightSidebarWrapper";
import { MessageSquare, Heart, Clock, MoreHorizontal, Plus } from "lucide-react";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

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

  // Mock data fallback
  let posts: any[] = [
    {
      id: 1,
      title: "My first successful Facebook Ad campaign! 🚀",
      content: "Just wanted to share a quick win. I implemented the strategies from Module 3 and launched my first campaign yesterday. The CPA is already 30% lower than my target! The key was really nailing down the custom audiences.",
      authorName: "Sarah Jenkins",
      authorInitial: "S",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      tags: ["Wins", "Facebook Ads"]
    },
    {
      id: 2,
      title: "Question: How do you handle iOS 14+ tracking issues?",
      content: "I'm setting up my Conversion API but I'm still seeing a discrepancy between Shopify and Ads Manager. Does anyone have a checklist for debugging this?",
      authorName: "Michael Chen",
      authorInitial: "M",
      likes: 12,
      comments: 15,
      timeAgo: "5 hours ago",
      tags: ["Question", "Tracking"]
    },
    {
      id: 3,
      title: "Copywriting swipe file - sharing my favorites",
      content: "Hey everyone, I've compiled a list of my top 50 favorite landing page headlines. Feel free to use these for inspiration in your next campaigns. Link in the comments!",
      authorName: "Jessica Alba (Mentor)",
      authorInitial: "J",
      likes: 89,
      comments: 32,
      timeAgo: "1 day ago",
      tags: ["Resource", "Copywriting"],
      isMentor: true
    }
  ];

  try {
    let query = `
      SELECT p.id, p.title, p.content, p.likes, p."createdAt", u.name, u.role
      FROM community_posts p
      JOIN users u ON p."userId" = u.id
    `;
    const queryParams: any[] = [];

    if (currentTab === "my_posts") {
      query += ` WHERE p."userId" = $1 ORDER BY p."createdAt" DESC`;
      queryParams.push(userId);
    } else if (currentTab === "trending") {
      query += ` ORDER BY p.likes DESC, p."createdAt" DESC`;
    } else {
      // Default: All Discussions
      query += ` ORDER BY p."createdAt" DESC`;
    }

    query += ` LIMIT 20`;

    const postsRes = await pool.query(query, queryParams);

    if (postsRes.rows.length > 0) {
      posts = postsRes.rows.map(row => {
        // Calculate basic time ago
        const diffInMs = new Date().getTime() - new Date(row.createdAt).getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        let timeAgo = diffInHours < 1 ? "Just now" : `${diffInHours} hours ago`;
        if (diffInHours > 24) timeAgo = `${Math.floor(diffInHours / 24)} days ago`;

        return {
          id: row.id,
          title: row.title,
          content: row.content,
          authorName: row.name || "Student",
          authorInitial: (row.name || "S").charAt(0).toUpperCase(),
          likes: row.likes,
          comments: 0, // Mocked for now until comments table is added
          timeAgo: timeAgo,
          tags: ["Discussion"],
          isMentor: row.role === 'INSTRUCTOR' || row.role === 'ADMIN'
        };
      });
    } else if (currentTab === "my_posts") {
      // If db connects but no posts for this user
      posts = [];
    }
  } catch (error) {
    console.warn("Database unavailable for community page, falling back to mock data:", error);
    // Adjust mock data slightly based on tabs for visual feedback
    if (currentTab === "my_posts") {
      posts = [posts[0]]; // Just show one post to mock "my posts"
    } else if (currentTab === "trending") {
      posts = [posts[2], posts[0], posts[1]]; // Reorder to put the 89 likes one first
    }
  }

  return (
    <RightSidebarWrapper>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="heading-md text-ink-900 mb-3">
            Community Forum
          </h1>
          <p className="text-ink-500 font-medium max-w-xl">
            Ask questions, share your wins, and network with other Digital Ghuru students and mentors.
          </p>
        </div>
        <button className="shrink-0 inline-flex items-center justify-center gap-2 bg-ink-900 hover:bg-brand-blue text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_4px_15px_rgba(20,20,40,0.1)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] text-sm tracking-[0.15em] uppercase group">
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          New Post
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-ink-200 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Link 
          href="/student/community?tab=all"
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${currentTab === "all" ? "text-brand-blue border-b-4 border-brand-blue relative top-[2px]" : "text-ink-400 hover:text-ink-900 border-b-4 border-transparent"}`}
        >
          All Discussions
        </Link>
        <Link 
          href="/student/community?tab=my_posts"
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${currentTab === "my_posts" ? "text-brand-blue border-b-4 border-brand-blue relative top-[2px]" : "text-ink-400 hover:text-ink-900 border-b-4 border-transparent"}`}
        >
          My Posts
        </Link>
        <Link 
          href="/student/community?tab=trending"
          className={`pb-4 text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors flex items-center gap-2 ${currentTab === "trending" ? "text-brand-blue border-b-4 border-brand-blue relative top-[2px]" : "text-ink-400 hover:text-ink-900 border-b-4 border-transparent"}`}
        >
          Trending <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full">HOT</span>
        </Link>
      </div>

      {/* Posts Feed */}
      <div className="flex flex-col gap-6">
        {posts.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 border border-ink-100 text-center">
            <h3 className="font-display text-base font-bold text-ink-900 mb-2">No posts found</h3>
            <p className="text-ink-500 font-medium">You haven't made any posts yet. Start a discussion!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-[32px] p-6 md:p-8 border border-ink-100 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(20,20,40,0.03)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-all cursor-pointer group">
              
              <div className="flex items-start gap-4 md:gap-6">
                {/* Avatar */}
                <div className={`h-12 w-12 rounded-full shrink-0 flex items-center justify-center text-lg font-bold ${post.isMentor ? 'bg-gradient-to-br from-brand-blue to-blue-800 text-white shadow-md' : 'bg-amber-100 text-amber-700'}`}>
                  {post.authorInitial}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-ink-900">{post.authorName}</span>
                      {post.isMentor && (
                        <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">Mentor</span>
                      )}
                      <span className="text-ink-300 text-sm hidden sm:inline">•</span>
                      <span className="text-ink-400 text-xs font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.timeAgo}
                      </span>
                    </div>
                    <button className="text-ink-300 hover:text-ink-900 transition-colors p-1 rounded-full hover:bg-ink-50">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-ink-500 font-medium line-clamp-2 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  {/* Tags & Metrics */}
                  <div className="flex items-center justify-between flex-wrap gap-4 mt-auto pt-4 border-t border-ink-50">
                    <div className="flex items-center gap-2">
                      {post.tags.map((tag: string, i: number) => (
                        <span key={i} className="bg-ink-50 text-ink-600 text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-ink-400 hover:text-amber-500 transition-colors group/metric">
                        <Heart className="h-5 w-5 group-hover/metric:fill-amber-500" />
                        <span className="text-sm font-bold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-ink-400 hover:text-brand-blue transition-colors group/metric">
                        <MessageSquare className="h-5 w-5 group-hover/metric:fill-brand-blue" />
                        <span className="text-sm font-bold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </RightSidebarWrapper>
  );
}
