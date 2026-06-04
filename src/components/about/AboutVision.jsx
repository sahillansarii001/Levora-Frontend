'use client';

import { Target, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

export default function AboutVision({ vision_title, vision_content, mission_title, mission_content }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Our Purpose" subtitle="Driven by a passion to transform education." centered />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-w-5xl mx-auto">
          <div className="group relative bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-navy-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] flex items-center justify-center mb-6">
              <Target size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold font-poppins mb-4 text-[var(--color-navy)] tracking-tight">
              {vision_title || 'Our Vision'}
            </h3>
            <div 
              className="text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: vision_content || '<p>To be the global benchmark in educational excellence, shaping future leaders who drive meaningful change in society.</p>' }}
            />
          </div>
          
          <div className="group relative bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center mb-6">
              <Lightbulb size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold font-poppins mb-4 text-[var(--color-navy)] tracking-tight">
              {mission_title || 'Our Mission'}
            </h3>
            <div 
              className="text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: mission_content || '<p>To deliver innovative, student-centric, and outcome-oriented education that empowers every learner to achieve their full potential.</p>' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
