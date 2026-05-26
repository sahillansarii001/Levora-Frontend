'use client';

import { Target, Lightbulb } from 'lucide-react';

export default function AboutVision({ vision_title, vision_content, mission_title, mission_content }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl">
            <Target size={32} className="text-navy mb-6" />
            <h3 className="text-2xl font-bold font-poppins mb-4 text-slate-900 tracking-tight">
              {vision_title || 'Our Vision'}
            </h3>
            <div 
              className="text-slate-600 text-lg leading-relaxed cms-content"
              dangerouslySetInnerHTML={{ __html: vision_content || '<p>To be the global benchmark in educational excellence...</p>' }}
            />
          </div>
          
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl">
            <Lightbulb size={32} className="text-gold mb-6" />
            <h3 className="text-2xl font-bold font-poppins text-slate-900 mb-4 tracking-tight">
              {mission_title || 'Our Mission'}
            </h3>
            <div 
              className="text-slate-600 text-lg leading-relaxed cms-content"
              dangerouslySetInnerHTML={{ __html: mission_content || '<p>To deliver innovative, student-centric, and outcome-oriented education...</p>' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
