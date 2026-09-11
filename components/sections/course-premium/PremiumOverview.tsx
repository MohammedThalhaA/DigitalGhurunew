import React from "react";
import Image from "next/image";
import { PlayCircle, Target, Briefcase, GraduationCap, Clock, CheckCircle2, MonitorPlay, Users, Award, TrendingUp, PenTool, ArrowRight } from "lucide-react";

export default function PremiumOverview() {
  return (
    <section id="overview" className="py-24 bg-[#F6F8FC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Text & Features */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center font-black text-[#4f46e5]">01</div>
              <span className="text-sm font-bold text-[#4f46e5] tracking-widest uppercase">Overview</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1730] leading-[1.1] mb-6">
              Master Digital Marketing.<br/>Work Smarter with <span className="text-[#4f46e5]">AI.</span>
            </h2>
            
            <p className="text-lg text-[#52627A] font-medium leading-relaxed mb-10">
              This course gives you a complete roadmap to build in-demand digital marketing skills and leverage AI tools to create powerful campaigns, generate content, and grow your online presence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
              <div className="flex gap-4">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <MonitorPlay className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1730] mb-1">Practical Projects</h4>
                  <p className="text-sm text-[#52627A] font-medium">Real-world experience</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1730] mb-1">Career Support</h4>
                  <p className="text-sm text-[#52627A] font-medium">Industry professionals</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <Target className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1730] mb-1">Job Assistance</h4>
                  <p className="text-sm text-[#52627A] font-medium">Job & freelance guidance</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1730] mb-1">Lifetime Access</h4>
                  <p className="text-sm text-[#52627A] font-medium">Learn at your pace</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Video Preview */}
          <div className="col-span-1 lg:col-span-4 relative flex items-center">
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-white">
              <Image 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                alt="Dashboard Preview" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-20 w-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50 group-hover:scale-110 transition-transform">
                  <PlayCircle className="h-10 w-10 text-white fill-[#4f46e5]" />
                </div>
                <span className="text-white font-bold mt-4 text-lg drop-shadow-md">Watch<br/>Course Preview</span>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-[#0B1730] font-black text-lg">Build Your</p>
                <p className="text-[#0B1730] font-black text-lg flex items-center gap-1">Future <ArrowRight className="h-4 w-4 text-[#4f46e5]" /></p>
              </div>
            </div>
          </div>

          {/* Right Column: Outcomes & Learnings */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 justify-center">
            
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
              <h3 className="font-bold text-[#0B1730] text-lg flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-[#4f46e5] rounded-full flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                What You'll Learn
              </h3>
              <ul className="space-y-4">
                {[
                  "Create high-converting campaigns",
                  "Use AI tools for content & automation",
                  "Build a personal brand",
                  "Get freelancing & job-ready skills"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#52627A] text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 text-[#4f46e5] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0B1730] text-lg flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-[#4f46e5] shrink-0">
                  <Target className="h-4 w-4" />
                </div>
                Your Career Outcomes
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                    <TrendingUp className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  <span className="text-xs font-bold text-[#52627A]">Digital<br/>Marketer</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                    <PenTool className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  <span className="text-xs font-bold text-[#52627A]">Content<br/>Creator</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                    <Briefcase className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  <span className="text-xs font-bold text-[#52627A]">Freelancer</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                    <Target className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  <span className="text-xs font-bold text-[#52627A]">Marketing<br/>Manager</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
