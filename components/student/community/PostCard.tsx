"use client";

import React, { useState } from "react";
import { MessageSquare, Heart, Clock, MoreHorizontal, Send, Trash2 } from "lucide-react";
import { toggleLike, createReply, deletePost, deleteReply } from "@/lib/community-actions";
import { useTransition } from "react";

export default function PostCard({ post, currentUserId }: { post: any, currentUserId: number }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(post.likes);
  const [optimisticHasLiked, setOptimisticHasLiked] = useState(post.hasLiked);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLike = () => {
    // Optimistic update
    setOptimisticHasLiked(!optimisticHasLiked);
    setOptimisticLikes(optimisticHasLiked ? optimisticLikes - 1 : optimisticLikes + 1);
    
    startTransition(async () => {
      await toggleLike(post.id);
    });
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    
    startTransition(async () => {
      await createReply(post.id, replyText);
      setReplyText("");
    });
  };

  const handleDeletePost = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      startTransition(async () => {
        await deletePost(post.id);
      });
    }
  };

  const handleDeleteReply = (replyId: number) => {
    if (confirm("Delete reply?")) {
      startTransition(async () => {
        await deleteReply(replyId);
      });
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-ink-100 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(20,20,40,0.03)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-all">
      <div 
        className="p-6 md:p-8 cursor-pointer group"
        onClick={(e) => {
          // Don't expand if clicking on interactive elements
          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-start gap-4 md:gap-6">
          {/* Avatar */}
          <div className={`h-12 w-12 rounded-full shrink-0 flex items-center justify-center text-lg font-bold ${post.isMentor ? 'bg-gradient-to-br from-brand-blue to-blue-800 text-white shadow-md' : 'bg-amber-100 text-amber-700'}`}>
            {post.authorInitial}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-1 relative">
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
              
              {post.userId === currentUserId && (
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-ink-300 hover:text-ink-900 transition-colors p-1 rounded-full hover:bg-ink-50"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-ink-100 rounded-2xl shadow-lg overflow-hidden z-10">
                      <button 
                        onClick={handleDeletePost}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors">
              {post.title}
            </h3>
            
            <p className={`text-ink-500 font-medium leading-relaxed mb-4 ${!isExpanded && 'line-clamp-2'}`}>
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
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition-colors group/metric ${optimisticHasLiked ? 'text-amber-500' : 'text-ink-400 hover:text-amber-500'}`}
                >
                  <Heart className={`h-5 w-5 ${optimisticHasLiked ? 'fill-amber-500' : 'group-hover/metric:fill-amber-500'}`} />
                  <span className="text-sm font-bold">{optimisticLikes}</span>
                </button>
                <div className="flex items-center gap-1.5 text-ink-400 group/metric">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm font-bold">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Replies Section */}
      {isExpanded && (
        <div className="border-t border-ink-100 bg-ink-50/30 rounded-b-[32px] p-6 md:p-8">
          <div className="pl-16">
            <h4 className="font-bold text-sm uppercase tracking-[0.1em] text-ink-400 mb-6">Replies ({post.replies.length})</h4>
            
            {post.replies.map((reply: any) => (
              <div key={reply.id} className="mb-6 last:mb-0 group/reply">
                <div className="flex items-start gap-4">
                  <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${reply.isMentor ? 'bg-gradient-to-br from-brand-blue to-blue-800 text-white' : 'bg-amber-100 text-amber-700'}`}>
                    {reply.authorInitial}
                  </div>
                  <div className="flex-1 bg-white border border-ink-100 rounded-2xl rounded-tl-none p-4 shadow-sm relative">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink-900">{reply.authorName}</span>
                        {reply.isMentor && <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full">Mentor</span>}
                        <span className="text-ink-300 text-xs">• {reply.timeAgo}</span>
                      </div>
                      {reply.userId === currentUserId && (
                        <button 
                          onClick={() => handleDeleteReply(reply.id)}
                          className="text-ink-300 hover:text-red-500 opacity-0 group-hover/reply:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-ink-600 text-sm">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply Input */}
            <div className="mt-8 flex items-start gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleReplySubmit()}
                  placeholder="Write a reply..."
                  className="w-full bg-white border border-ink-200 rounded-full py-3 px-6 pr-12 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                  disabled={isPending}
                />
                <button 
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim() || isPending}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
