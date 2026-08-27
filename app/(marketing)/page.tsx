"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import CourseCard from "@/components/cards/CourseCard";
import StatCard from "@/components/cards/StatCard";
import ComparisonTable from "@/components/sections/ComparisonTable";
import FounderCard from "@/components/cards/FounderCard";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCourseGate } from "@/components/shared/useCourseGate";

// Newly integrated sections
import LogoWall from "@/components/sections/LogoWall";
import DesignedFor from "@/components/sections/DesignedFor";
import AgencyModel from "@/components/sections/AgencyModel";
import ToolsCovered from "@/components/sections/ToolsCovered";
import CertificateSection from "@/components/sections/CertificateSection";
import LeadCaptureForm from "@/components/sections/LeadCaptureForm";
import PhotoGallery from "@/components/sections/PhotoGallery";

/* ─── Mock Data & Branding Configs ─── */

const hiringPartners = [
  { name: "Google", logoUrl: "https://logo.clearbit.com/google.com" },
  { name: "Meta", logoUrl: "https://logo.clearbit.com/meta.com" },
  { name: "HubSpot", logoUrl: "https://logo.clearbit.com/hubspot.com" },
  { name: "Zoho", logoUrl: "https://logo.clearbit.com/zoho.com" },
  { name: "Shopify", logoUrl: "https://logo.clearbit.com/shopify.com" },
  { name: "Freshworks", logoUrl: "https://logo.clearbit.com/freshworks.com" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80", alt: "Students collaborating on a mock agency project" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80", alt: "DigitalGhuru classroom lecture session" },
  { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80", alt: "Student pitching digital campaign metrics" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", alt: "Happy DigitalGhuru alumni graduates" },
];

const courses = [
  {
    format: "Classroom",
    duration: "4 Months",
    title: "Digital Marketing Course — Chennai",
    blurb:
      "Comprehensive hands-on training covering SEO, SEM, Social Media, Content Marketing, and Analytics with live projects.",
    originalPrice: "₹50,000",
    discountedPrice: "₹35,000",
    ctaHref: "/courses/digital-marketing-chennai",
  },
  {
    format: "Online",
    duration: "3 Months",
    title: "Online Digital Marketing Course",
    blurb:
      "Learn digital marketing from anywhere with live interactive sessions, recorded content, and mentorship support.",
    originalPrice: "₹40,000",
    discountedPrice: "₹25,000",
    ctaHref: "/courses/online-digital-marketing",
  },
  {
    format: "Advanced",
    duration: "6 Months",
    title: "Advanced Digital Marketing Program",
    blurb:
      "Deep-dive into advanced strategies, AI-driven marketing, automation tools, and agency-style campaign management.",
    originalPrice: "₹75,000",
    discountedPrice: "₹55,000",
    ctaHref: "/courses/advanced-program",
  },
  {
    format: "Short-term",
    duration: "4 Weeks",
    title: "Short-term Intensive Courses",
    blurb:
      "Focused modules on specific skills — SEO, Google Ads, Meta Ads, Email Marketing, or Analytics.",
    originalPrice: "₹15,000",
    discountedPrice: "₹10,000",
    ctaHref: "/courses/short-term",
  },
];

const stats = [
  { value: 5000, suffix: "+", label: "Students Trained", color: "blue" as const },
  { value: 95, suffix: "%", label: "Placement Rate", color: "gold" as const },
  { value: 50, suffix: "+", label: "Industry Partners", color: "orange" as const },
  { value: 8, suffix: "+", label: "Years of Excellence", color: "blue" as const },
];

const comparisonRows = [
  { feature: "Live project training", us: true, others: false },
  { feature: "AI-integrated curriculum", us: true, others: false },
  { feature: "Dedicated placement support", us: true, others: false },
  { feature: "Industry expert mentors", us: true, others: true },
  { feature: "Dual certification", us: true, others: false },
  { feature: "Small batch sizes (<30)", us: true, others: false },
  { feature: "Lifetime access to resources", us: true, others: true },
  { feature: "Agency-style campaign training", us: true, others: false },
];

const founders = [
  {
    name: "Founder Name",
    role: "Founder & Chief Mentor",
    credentials: [
      "Google Certified Digital Marketing Expert",
      "10+ years in digital marketing industry",
      "Trained 5000+ students across India",
      "Speaker at major digital marketing summits",
    ],
  },
];

const testimonials = [
  {
    quote: "DigitalGhuru completely transformed my career. The hands-on training and placement support helped me land my dream job within weeks of completing the course.",
    name: "Student Name",
    role: "Digital Marketing Executive — Company",
  },
  {
    quote: "The best investment I've made in my career. The mentors are incredible and the curriculum covers everything you need to succeed in digital marketing.",
    name: "Student Name",
    role: "SEO Specialist — Company",
  },
  {
    quote: "Unlike other institutes, DigitalGhuru focuses on practical skills. We worked on real projects for real clients, which gave me the confidence to excel.",
    name: "Student Name",
    role: "Social Media Manager — Company",
  },
  {
    quote: "The AI-integrated learning modules were a game changer. I learned how to use cutting-edge tools that are actually used in the industry today.",
    name: "Student Name",
    role: "Content Strategist — Company",
  },
  {
    quote: "The community at DigitalGhuru is amazing. Even after completing the course, the support and networking opportunities continue to benefit my career.",
    name: "Student Name",
    role: "Freelance Digital Marketer",
  },
];

const faqs = [
  {
    question: "What is the duration of the digital marketing course?",
    answer: "Our courses range from 4 weeks (short-term intensive) to 6 months (advanced program). The most popular classroom course in Chennai is 4 months, and the online course is 3 months. Each format includes hands-on projects, mentor sessions, and placement preparation.",
  },
  {
    question: "Do you provide placement support?",
    answer: "Yes, we provide 100% placement support with a dedicated placement cell. Our team works with 50+ industry partners to ensure every student gets interview opportunities. We also provide resume building, mock interviews, and LinkedIn profile optimization as part of the placement preparation.",
  },
  {
    question: "What certifications will I receive?",
    answer: "Upon successful completion, you receive a DigitalGhuru certification. Additionally, we prepare you for Google Ads, Google Analytics, Meta Blueprint, and HubSpot certifications — all included in the course fee.",
  },
  {
    question: "Are there any prerequisites to join?",
    answer: "No specific prerequisites are required. Our courses are designed for beginners as well as professionals looking to upskill. Basic computer literacy and a willingness to learn are all you need.",
  },
  {
    question: "What is the fee structure and are EMI options available?",
    answer: "We offer flexible payment options including one-time payment (with early bird discounts), and EMI options through select banking partners. Contact our admissions team for the latest fee structure and available offers.",
  },
  {
    question: "Can I attend a demo class before enrolling?",
    answer: "Absolutely! We offer free demo classes every week. You can experience our teaching methodology, meet our mentors, and understand the course curriculum before making a decision. Book a free demo through our contact page.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  const router = useRouter();
  const { triggerAction, GateModalComponent } = useCourseGate("DigitalGhuru Courses");

  const handleViewDetails = (href: string) => {
    triggerAction(() => {
      router.push(href);
    });
  };

  const handleDownloadBrochure = (title: string) => {
    triggerAction(() => {
      const link = document.createElement("a");
      link.href = "/digitalghuru-brochure.txt";
      link.download = `${title.replace(/\s+/g, "_")}_Brochure.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <>
      {/* ─── 1. Hero Section ─── */}
      <HeroSection
        trustBadges={[
          { label: "100% Placement Support" },
          { label: "Google Certified" },
          { label: "AI-Integrated" },
        ]}
        eyebrow="India's Premier Digital Marketing Institute"
        title="Master Digital Marketing with"
        titleHighlight="Real-World Training"
        description="Join thousands of successful professionals who launched their digital marketing careers with DigitalGhuru's hands-on, industry-aligned courses."
        primaryCta={{ label: "Explore Courses", href: "#course-grid" }}
        secondaryCta={{ label: "Book Free Demo", href: "#inquiry-form" }}
      />

      {/* ─── 2. Logo Wall (Hiring Partners) ─── */}
      <LogoWall
        eyebrow="PLACEMENT PARTNERS"
        title="Our Alumni Work at Leading Agencies & Brands"
        logos={hiringPartners}
      />

      {/* ─── 3. Stats Strip ─── */}
      <section className="bg-white border-y border-ink-100">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-100">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Designed For Section ─── */}
      <DesignedFor />

      {/* ─── 5. Agency-Style Model Section ─── */}
      <AgencyModel />

      {/* ─── 6. Course Grid ─── */}
      <section className="section-padding bg-white" id="course-grid">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">OUR COURSES</p>
            <h2 className="heading-lg mb-4 text-ink-900">
              Industry-Leading Digital Marketing Programs
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-ink-500">
              Choose from our range of carefully crafted programs designed to match your career goals and learning style.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {courses.map((course, idx) => (
              <motion.div key={idx} variants={fadeUpItem}>
                <CourseCard
                  {...course}
                  onViewDetails={handleViewDetails}
                  onDownloadBrochure={handleDownloadBrochure}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 7. Tools Covered Section ─── */}
      <ToolsCovered />

      {/* ─── 8. Comparison Table ─── */}
      <ComparisonTable rows={comparisonRows} />

      {/* ─── 9. Certificate Showcase Section ─── */}
      <CertificateSection />

      {/* ─── 10. Founder / Trainer Highlight ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">MEET THE MENTOR</p>
            <h2 className="heading-lg mb-4 text-ink-900 font-bold">Learn From the Best</h2>
            <p className="body-lg max-w-2xl mx-auto text-ink-500">
              Our mentors are seasoned industry professionals who bring real-world experience into every session.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {founders.map((founder, idx) => (
              <FounderCard key={idx} {...founder} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. Campus Photo Gallery ─── */}
      <PhotoGallery
        eyebrow="CAMPUS GALLERY"
        title="Explore Life at DigitalGhuru"
        images={galleryImages}
      />

      {/* ─── 12. Testimonials ─── */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* ─── 13. Success Story Highlight ─── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-3">SUCCESS STORIES</p>
              <h2 className="heading-lg mb-6 text-ink-900 font-bold">
                Our Alumni Are Making Waves in the Industry
              </h2>
              <p className="body-lg mb-6 text-ink-500">
                From fresh graduates to career switchers, our students have gone on to work with leading brands, agencies, and startups across India and beyond.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Graduates placed at top digital agencies",
                  "Alumni running successful freelance businesses",
                  "Students earning promotions within months",
                  "Career switchers landing their first marketing role",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-ink-700 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="primary" href="/success-stories">
                View All Success Stories
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-blue/5 via-brand-gold/5 to-brand-orange/5 flex items-center justify-center border border-ink-100">
                <div className="text-center p-8">
                  <Star className="h-16 w-16 text-brand-gold mx-auto mb-4" />
                  <p className="font-display text-3xl font-bold text-ink-900 mb-2">
                    95%+
                  </p>
                  <p className="font-heading text-ink-500">
                    Placement Success Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 14. Lead Capture Form ─── */}
      <LeadCaptureForm />

      {/* ─── 15. FAQ ─── */}
      <FAQAccordion items={faqs} />
      <GateModalComponent />
    </>
  );
}
