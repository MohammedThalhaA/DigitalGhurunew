import React from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall, Laptop, Bot, FolderKanban, BriefcaseBusiness, CheckCircle2 } from "lucide-react";

export default function PremiumHighlights() {
  return (
    <section id="highlights" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center font-black text-[#4f46e5]">02</div>
              <span className="text-sm font-bold text-[#4f46e5] tracking-widest uppercase">Program Highlights</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B1730]">
              Everything you need to succeed<br className="hidden md:block"/> in the digital world.
            </h2>
          </div>
          <button className="text-[#4f46e5] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm">
            View all Highlights <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Large Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 relative overflow-hidden border border-blue-100/50 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col gap-6 h-full">
              {/* Image in the card */}
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg border border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Personal Mentorship" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md">
                  <PhoneCall className="h-4 w-4 text-[#4f46e5]" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0B1730] mb-3">Personal Mentorship</h3>
                <p className="text-[#52627A] font-medium leading-relaxed mb-6">
                  Get 1:1 guidance from industry experts and receive personalized feedback on your campaigns and strategies.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-bold text-[#4f46e5] shadow-sm">
                    <Laptop className="h-4 w-4" /> 1-on-1 Sessions
                  </div>
                  <button className="h-10 w-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center hover:bg-[#4338ca] transition-colors shadow-md">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                  <FolderKanban className="h-7 w-7 text-[#4f46e5]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] mb-2">Hands-on Projects</h3>
                <p className="text-[#52627A] font-medium text-sm leading-relaxed">
                  Work on real campaigns and build your portfolio with guided, practical assignments.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-[#52627A] self-start border border-gray-100">
                <CheckCircle2 className="h-3 w-3 text-[#4f46e5]" /> 5+ Projects
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <Bot className="h-7 w-7 text-[#1476FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] mb-2">AI-Powered Curriculum</h3>
                <p className="text-[#52627A] font-medium text-sm leading-relaxed">
                  Learn the latest AI tools and modern marketing strategies to 10x your productivity.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-[#52627A] self-start border border-gray-100">
                <CheckCircle2 className="h-3 w-3 text-[#1476FF]" /> Updated for 2026
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                  <Laptop className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] mb-2">Portfolio Building</h3>
                <p className="text-[#52627A] font-medium text-sm leading-relaxed">
                  Showcase your skills with a professional portfolio of real-world marketing projects.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-[#52627A] self-start border border-gray-100">
                <CheckCircle2 className="h-3 w-3 text-purple-600" /> Portfolio Certificate
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                  <BriefcaseBusiness className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1730] mb-2">Career & Freelancing Support</h3>
                <p className="text-[#52627A] font-medium text-sm leading-relaxed">
                  Get help with job placement, freelancing strategies, and career guidance.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-[#52627A] self-start border border-gray-100">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Lifetime Access
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
