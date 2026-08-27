import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverUrl?: string;
  date: string;
  readTime?: string;
  href: string;
}

export default function BlogCard({
  title,
  excerpt,
  coverUrl,
  date,
  readTime,
  href,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-2xl border border-ink-100 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden h-full"
    >
      {/* Cover Image */}
      {coverUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Meta Row */}
        <div className="flex items-center gap-3 text-xs text-ink-400 mb-3">
          <span>{date}</span>
          {readTime && (
            <>
              <span className="h-1 w-1 rounded-full bg-ink-300" />
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-ink-900 mb-2 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-ink-500 leading-relaxed flex-1 line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More */}
        <span className="flex items-center gap-1 text-sm font-heading font-semibold text-brand-blue group-hover:gap-2 transition-all duration-200">
          Read More
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
