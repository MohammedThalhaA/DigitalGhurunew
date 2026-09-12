"use client";

import React, { useState, useTransition } from "react";
import { X, Loader2 } from "lucide-react";
import { createPost } from "@/lib/community-actions";

const AVAILABLE_TAGS = [
  "Discussion", "Wins", "Question", "Resource", "Facebook Ads", "Copywriting", "Tracking", "Automation", "SEO"
];

export default function CreatePostModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    startTransition(async () => {
      await createPost(title, content, tags.length > 0 ? tags : ["Discussion"]);
      setTitle("");
      setContent("");
      setTags([]);
      onClose();
    });
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      if (tags.length >= 3) return; // limit to 3 tags
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-sm text-ink-900">Create New Post</h2>
            <button onClick={onClose} className="p-2 bg-ink-50 hover:bg-ink-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-ink-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.1em] text-ink-500 mb-2">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-ink-50 border border-ink-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.1em] text-ink-500 mb-2">Details</label>
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share your question, win, or resource..."
                className="w-full bg-ink-50 border border-ink-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all min-h-[150px] resize-y"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.1em] text-ink-500 mb-2">Tags (Select up to 3)</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-[0.15em] transition-all ${
                      tags.includes(tag) 
                        ? "bg-brand-blue text-white" 
                        : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-ink-100">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 font-bold text-ink-500 hover:text-ink-900 transition-colors"
                disabled={isPending}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!title.trim() || !content.trim() || isPending}
                className="flex items-center gap-2 bg-brand-blue text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
