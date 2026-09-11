import React from "react";
import LinearHero from "./LinearHero";
import LinearSidebarCard from "./LinearSidebarCard";
import LinearOverview from "./LinearOverview";
import LinearDesignedToHelp from "./LinearDesignedToHelp";
import LinearAIInMarketing from "./LinearAIInMarketing";
import LinearWhyDigitalGhuru from "./LinearWhyDigitalGhuru";
import LinearWhoIsThisFor from "./LinearWhoIsThisFor";
import LinearHighlights from "./LinearHighlights";
import LinearCurriculum from "./LinearCurriculum";
import LinearTools from "./LinearTools";
import LinearCategorizedTools from "./LinearCategorizedTools";
import LinearAIProfileBuilding from "./LinearAIProfileBuilding";
import LinearInternshipProjects from "./LinearInternshipProjects";
import LinearSoftSkillsCareer from "./LinearSoftSkillsCareer";
import LinearFAQs from "./LinearFAQs";

interface ModernLinearCourseLayoutProps {
  course: any;
}

export default function ModernLinearCourseLayout({ course }: ModernLinearCourseLayoutProps) {
  return (
    <div className="bg-white text-ink-900">
      {/* 1. Full Width Hero */}
      <LinearHero 
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        bannerImage={course.bannerImage || course.marketing_data?.bannerImage || course.heroImage}
      />
      
      {/* 2. Top Section: Overview + Sidebar (70/30) */}
      <div className="section-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative pt-8 lg:pt-12">
          
          {/* Left Column */}
          <div className="col-span-1 lg:col-span-8">
            <LinearOverview 
              learnings={course.overviewLearnings} 
              description={course.overviewDescription} 
            />
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-8 z-30 order-first lg:order-last lg:-mt-32">
            <LinearSidebarCard 
              originalPrice={course.originalPrice}
              discountedPrice={course.discountedPrice}
              moduleCount={course.curriculum?.length}
              duration={course.duration}
              format={course.format}
              previewImage={course.cardImage || course.marketing_data?.cardImage || course.bannerImage || course.marketing_data?.bannerImage}
            />
          </div>

        </div>
      </div>

      {/* 3. Full-Width Sections */}
      <div className="section-container">
        <LinearDesignedToHelp 
          title={course.designedToHelp?.title} 
          description={course.designedToHelp?.description} 
          benefits={course.designedToHelp?.benefits} 
        />
        <LinearAIInMarketing 
          title={course.numberedFeatures?.title} 
          description={course.numberedFeatures?.description} 
          features={course.numberedFeatures?.features} 
        />
        <LinearWhyDigitalGhuru 
          title={course.whyDigitalGhuru?.title} 
          reasons={course.whyDigitalGhuru?.reasons} 
        />
        <LinearWhoIsThisFor audiences={course.whoIsThisForData} />
        <LinearHighlights highlights={course.highlightsData} />

        {/* Technologies You Will Master - BEFORE Curriculum */}
        {course.categorizedToolsData ? (
          <LinearCategorizedTools groups={course.categorizedToolsData} />
        ) : (
          <LinearTools tools={course.tools} />
        )}

        {/* Curriculum / Modules */}
        <LinearCurriculum curriculum={course.curriculum || []} />

        {/* 5 Core Common Sections across all courses:
            1. AI Enhanced Profile Building
            2. Internship & Real-Time Projects
            3. Placement Support System
            4. Soft Skills & Career Training
            5. Career Opportunities */}
        <LinearAIProfileBuilding 
          description={course.aiProfileBuildingDesc} 
        />

        <LinearInternshipProjects />

        <LinearSoftSkillsCareer 
          careerDesc={course.title ? `The demand for skilled ${course.title} professionals is rapidly growing across industries.` : undefined}
        />

        <LinearFAQs faqs={course.faqs} />
      </div>
    </div>
  );
}
