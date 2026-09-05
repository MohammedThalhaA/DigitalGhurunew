"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Globe } from "lucide-react";

export default function ContactAndMap({ course }: { course?: any }) {
  const courseTitle = course?.title || "AI-Powered Digital Marketing Course";

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-ink-900 tracking-tight mb-6">
            How Do I Contact Digital Ghuru for the {courseTitle} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Campus?</span>
          </h2>
          <p className="text-ink-600 text-lg leading-relaxed font-medium">
            Digital Ghuru's Main Campus is located in the heart of the city, easily accessible from Anna Nagar, T. Nagar, Adyar, Velachery, OMR, and Tambaram. Weekend batches run every Saturday and Sunday.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details (Previous Clean Design) */}
          <div className="space-y-6">
              
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-6"
            >
              <div className="h-20 w-20 rounded-2xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                <MapPin className="h-8 w-8 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Address</p>
                <p className="text-lg font-bold text-slate-900 mb-1.5">Digital Ghuru</p>
                <p className="text-slate-500 text-sm leading-relaxed">1B, Sapna Trade Centre, 135, Poonamallee High Rd,<br/>Purasaiwakkam, Tamil Nadu 600084</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-6"
            >
              <div className="h-20 w-20 rounded-2xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                <Phone className="h-8 w-8 text-blue-600" strokeWidth={2} />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone</p>
                  <p className="text-lg font-bold text-slate-900">+91 9513632705</p>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email</p>
                  <p className="text-lg font-bold text-blue-600">info@digitalghuru.in</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-6"
            >
              <div className="h-20 w-20 rounded-2xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                <Globe className="h-8 w-8 text-blue-600" strokeWidth={2} />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Founders</p>
                  <p className="text-lg font-bold text-slate-900">Our Expert Mentors</p>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Website</p>
                  <p className="text-lg font-bold text-blue-600">digitalghuru.in</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Google Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-full min-h-[400px] bg-white rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)] overflow-hidden"
          >
            <div className="p-2 h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1953282216515!2d80.25203307584102!3d13.086815312344717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e31535492d%3A0xc3af72eb0f878f14!2sDigital%20Ghuru%20%7C%20AI%20Digital%20Marketing%20Course%20in%20Our Campus!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.5rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[460px]"
              ></iframe>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
