import React from "react";
import PremiumHero from "./PremiumHero";
import StickyCourseNav from "./StickyCourseNav";
import PremiumOverview from "./PremiumOverview";
import PremiumHighlights from "./PremiumHighlights";
import PremiumAudience from "./PremiumAudience";
import PremiumCurriculum from "./PremiumCurriculum";
import PremiumTools from "./PremiumTools";
import PremiumFAQs from "./PremiumFAQs";
import PremiumBottomCTA from "./PremiumBottomCTA";

interface PremiumCourseLayoutProps {
  course: any; // We're using any here for quick integration, ideally use the precise CourseData interface
}

export default function PremiumCourseLayout({ course }: PremiumCourseLayoutProps) {
  return (
    <div className="bg-white font-sans selection:bg-[#4f46e5]/20">
      <PremiumHero 
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        originalPrice={course.originalPrice}
        discountedPrice={course.discountedPrice}
      />
      
      <StickyCourseNav />
      
      <PremiumOverview />
      
      <PremiumHighlights />
      
      <PremiumAudience />
      
      <PremiumCurriculum curriculum={course.curriculum} />
      
      <PremiumTools tools={course.tools} />
      
      <PremiumFAQs faqs={course.faqs} />
      
      <PremiumBottomCTA courseTitle={course.title} />
    </div>
  );
}
