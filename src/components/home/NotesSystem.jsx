'use client';

import { motion } from 'framer-motion';
import { FileText, Edit3, BookOpen, Layers, Code2, DownloadCloud, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const noteFeatures = [
  { icon: <FileText size={22} />, title: "Chapterwise Notes", desc: "Detailed, exam-oriented study material mapped to latest syllabus." },
  { icon: <Edit3 size={22} />, title: "Handwritten Notes", desc: "Easy to understand notes crafted by previous year toppers." },
  { icon: <BookOpen size={22} />, title: "PYQs Solutions", desc: "Past 10 years question papers with detailed step-by-step solutions." },
  { icon: <Layers size={22} />, title: "Formula Sheets", desc: "Quick revision modules and mind maps for rapid exam prep." },
  { icon: <Code2 size={22} />, title: "Coding Cheat Sheets", desc: "Syntax and program cheat sheets for CS students." },
  { icon: <DownloadCloud size={22} />, title: "Practice Worksheets", desc: "Daily practice problems (DPPs) with difficulty tiers." },
];

export default function NotesSystem() {
  return (
    <section className="py-28 bg-gradient-to-br from-[var(--color-dark)] via-[var(--color-navy)] to-[var(--color-dark)] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-gold)]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[var(--color-gold)]/10 px-4 py-2 rounded-full text-sm font-bold text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-6"
            >
              <Sparkles size={14} />
              <span>Exclusive Resource</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-6 tracking-tight leading-tight">
              Levora <span className="gradient-text">Self Notes</span> System
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              Disorganized studying is a thing of the past. Our proprietary notes system provides structured, high-yield material designed scientifically for maximum retention.
            </p>
          </div>
          <div>
            <Link href="/study-materials" className="btn-primary inline-flex items-center gap-2 text-base">
              Access Library <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {noteFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative card-dark p-8 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-700/50 text-[var(--color-gold)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 transition-all duration-500 ring-1 ring-slate-600/50 group-hover:ring-[var(--color-gold)]/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
