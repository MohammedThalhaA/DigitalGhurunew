import React from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap, Briefcase, TrendingUp, UserCheck, Check } from "lucide-react";

export default function PremiumAudience() {
  const audiences = [
    {
      title: "Students",
      description: "Build in-demand skills and kickstart your career.",
      icon: <GraduationCap className="h-4 w-4 text-[#4f46e5]" />,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
      points: ["Job-ready skills", "Internship opportunities", "Portfolio building"]
    },
    {
      title: "Freelancers",
      description: "Get better clients and increase your income.",
      icon: <Briefcase className="h-4 w-4 text-[#4f46e5]" />,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      points: ["High-value skills", "Freelancing support", "Portfolio showcase"]
    },
    {
      title: "Entrepreneurs",
      description: "Grow your business with modern digital strategies.",
      icon: <TrendingUp className="h-4 w-4 text-[#4f46e5]" />,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=400",
      points: ["More visibility", "Load generation", "Sales & conversions"]
    },
    {
      title: "Professionals",
      description: "Upgrade your skills and stay ahead in your career.",
      icon: <UserCheck className="h-4 w-4 text-[#4f46e5]" />,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      points: ["Career growth", "Industry-relevant skills", "Certification"]
    }
  ];

  return (
    <section id="audience" className="py-24 bg-[#F6F8FC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col xl:flex-row gap-12">
          
          {/* Left Content */}
          <div className="xl:w-[30%] flex flex-col items-start pt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center font-black text-[#4f46e5]">03</div>
              <span className="text-sm font-bold text-[#4f46e5] tracking-widest uppercase">Who Should Join</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1730] leading-[1.1] mb-6">
              Built for ambitious people<br/>who want to do more.
            </h2>
            
            <p className="text-[#52627A] font-medium leading-relaxed mb-10 text-lg">
              Whether you're just starting or looking to upskill, this course is designed for you.
            </p>

            <button className="px-8 py-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_10px_20px_rgba(79,70,229,0.4)]">
              Join Now <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Right Cards Scroll Container */}
          <div className="xl:w-[70%]">
            <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 -mx-4 xl:px-0 xl:mx-0 snap-x hide-scrollbar">
              {audiences.map((aud, idx) => (
                <div key={idx} className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group snap-start flex flex-col">
                  {/* Image */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image 
                      src={aud.image}
                      alt={aud.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col relative">
                    <div className="absolute -top-6 left-6 h-12 w-12 bg-white rounded-xl shadow-md border border-gray-50 flex items-center justify-center z-10">
                      {aud.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0B1730] mb-2 mt-4">{aud.title}</h3>
                    <p className="text-sm font-medium text-[#52627A] mb-6 leading-relaxed flex-1">
                      {aud.description}
                    </p>
                    
                    <ul className="space-y-3 mt-auto pt-6 border-t border-gray-100">
                      {aud.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-[13px] font-semibold text-[#8793A5]">
                          <Check className="h-4 w-4 text-[#19B47A] shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
