"use client";

import React, { useState, useEffect } from "react";
import { Share2, Check, Copy, MessageCircle, Linkedin, Twitter, Facebook } from "lucide-react";

interface BlogShareBarProps {
  title: string;
  slug: string;
}

export default function BlogShareBar({ title, slug }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://digitalghuru.com/blog/${slug}`);

  // Safely update to current URL on client after hydration completes
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href) {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 pb-6 border-y border-ink-100 my-8">
      <span className="text-xs font-bold text-ink-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
        <Share2 className="h-3.5 w-3.5 text-brand-blue" />
        Share Article:
      </span>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-100 hover:bg-ink-200 text-ink-700 text-xs font-semibold transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold transition-colors"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] text-xs font-semibold transition-colors"
      >
        <Linkedin className="h-3.5 w-3.5" />
        <span>LinkedIn</span>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-900/5 hover:bg-ink-900/15 text-ink-900 text-xs font-semibold transition-colors"
      >
        <Twitter className="h-3.5 w-3.5" />
        <span>X</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-semibold transition-colors"
      >
        <Facebook className="h-3.5 w-3.5" />
        <span>Facebook</span>
      </a>
    </div>
  );
}

