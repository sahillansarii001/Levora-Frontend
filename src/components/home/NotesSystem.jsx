'use client';

import { motion } from 'framer-motion';
import { FileText, Edit3, BookOpen, Layers, Code2, DownloadCloud, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const noteFeatures = [
  { icon: <FileText size={24} />, title: "Chapterwise Notes", desc: "Detailed, exam-oriented study material mapped to latest syllabus." },
  { icon: <Edit3 size={24} />, title: "Handwritten Notes", desc: "Easy to understand notes crafted by previous year toppers." },
  { icon: <BookOpen size={24} />, title: "PYQs Solutions", desc: "Past 10 years question papers with detailed step-by-step solutions." },
  { icon: <Layers size={24} />, title: "Formula Sheets", desc: "Quick revision modules and mind maps for rapid exam prep." },
  { icon: <Code2 size={24} />, title: "Coding Cheat Sheets", desc: "Syntax and program cheat sheets for CS students." },
  { icon: <DownloadCloud size={24} />, title: "Practice Worksheets", desc: "Daily practice problems (DPPs) with difficulty tiers." },
];

export default function NotesSystem() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy/50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center space-x-2 bg-gold/10 px-3 py-1 rounded-full text-sm font-bold text-gold mb-6 uppercase tracking-wider">
              <span>Exclusive Resource</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-6 tracking-tight">
              Levora <span className="text-gold">Self Notes</span> System
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              Disorganized studying is a thing of the past. Our proprietary notes system provides structured, high-yield material designed scientifically for maximum retention.
            </p>
          </div>
          <div>
            <Link href="/study-materials" className="btn-primary inline-flex items-center">
              Access Library <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noteFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-700 text-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
