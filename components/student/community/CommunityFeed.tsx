"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import CreatePostModal from "./CreatePostModal";
import PostCard from "./PostCard";

interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorInitial: string;
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
  isMentor: boolean;
  hasLiked: boolean;
  userId: number; // to check if current user owns it
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
  authorName: string;
  authorInitial: string;
  isMentor: boolean;
  timeAgo: string;
  userId: number;
}

interface CommunityFeedProps {
  initialPosts: Post[];
  currentUserId: number;
  currentTab: string;
}

export default function CommunityFeed({ initialPosts, currentUserId, currentTab }: CommunityFeedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="heading-md text-ink-900 mb-3">Community Forum</h1>
          <p className="text-ink-500 font-medium max-w-xl">
            Ask questions, share your wins, and network with other Digital Ghuru students and mentors.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFB800] to-[#FF5C00] text-white font-bold py-4 px-8 rounded-full transition-all shadow-md hover:shadow-lg text-sm tracking-[0.15em] uppercase group border-none"
        >
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
        {initialPosts.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 border border-ink-100 text-center">
            <h3 className="font-display text-base font-bold text-ink-900 mb-2">No posts found</h3>
            <p className="text-ink-500 font-medium">Be the first to start a discussion!</p>
          </div>
        ) : (
          initialPosts.map(post => (
            <PostCard key={post.id} post={post} currentUserId={currentUserId} />
          ))
        )}
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
