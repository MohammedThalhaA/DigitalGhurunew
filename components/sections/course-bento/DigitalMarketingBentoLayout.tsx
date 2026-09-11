import React from "react";
import BentoHero from "./BentoHero";
import BentoGrid from "./BentoGrid";
import BentoModules from "./BentoModules";
import BentoTools from "./BentoTools";
import BentoFAQs from "./BentoFAQs";

// Define the interface locally or import it if exported from page.tsx
interface DigitalMarketingBentoLayoutProps {
  course: any; // We'll just use any here to avoid repeating the huge interface, or define it
}

export default function DigitalMarketingBentoLayout({ course }: DigitalMarketingBentoLayoutProps) {
  return (
    <div className="bg-[#fafcff] font-sans selection:bg-brand-blue/20">
      <BentoHero 
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        originalPrice={course.originalPrice}
        discountedPrice={course.discountedPrice}
      />
      
      <div className="section-container relative z-20 -mt-10 lg:-mt-16">
        <BentoGrid 
          outcomes={course.outcomes} 
          usps={course.usps} 
          specialHighlights={course.specialHighlights} 
        />
        
        <BentoModules curriculum={course.curriculum} />
        
        <BentoTools tools={course.tools} />
        
        <BentoFAQs faqs={course.faqs} />
      </div>
      
      {/* Mobile Sticky Enrollment Bar (Fixed at bottom since there's no sidebar) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-ink-200/50 p-4 z-50 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div>
          <span className="text-xl font-black text-ink-900 block leading-none">{course.discountedPrice !== "Contact Us" ? course.discountedPrice : "Talk to Expert"}</span>
          {course.originalPrice !== "—" && (
            <span className="text-sm text-ink-400 line-through font-bold">{course.originalPrice}</span>
          )}
        </div>
        <a href="/signup" className="px-6 py-3 bg-brand-blue text-white rounded-full font-black text-sm shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]">
          Enroll Now
        </a>
      </div>
    </div>
  );
}
