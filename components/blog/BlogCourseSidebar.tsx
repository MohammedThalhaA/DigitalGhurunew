import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import LinearSidebarCard from "@/components/sections/course-linear/LinearSidebarCard";
import type { CourseSummary } from "@/lib/actions/blogs";

interface BlogCourseSidebarProps {
  course: CourseSummary;
}

export default function BlogCourseSidebar({ course }: BlogCourseSidebarProps) {
  return (
    <aside className="w-full lg:w-[380px] shrink-0 blog-sticky-sidebar lg:sticky lg:top-[104px] self-start z-30 order-2 lg:order-1 mt-8 lg:mt-0">
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Related Certification
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="text-xs font-bold text-ink-500 hover:text-brand-blue transition-colors flex items-center gap-1 group"
          >
            View Details
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <LinearSidebarCard
          courseId={course.id}
          courseTitle={course.title}
          originalPrice={course.originalPrice}
          discountedPrice={course.discountedPrice}
          moduleCount={course.moduleCount}
          duration={course.duration}
          format={course.format}
          previewImage={course.previewImage}
          brochureUrl={course.brochureUrl}
          showCareerFeatures={course.showCareerFeatures}
        />
      </div>
    </aside>
  );
}
