'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Terminal, Database, Smartphone, Globe, LayoutTemplate, Cpu, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const codingCourses = [
  { id: 1, title: 'Python Programming', icon: <Terminal size={20} />, tag: 'Beginner', desc: "Learn logic building and core Python.", gradient: 'from-blue-500 to-indigo-600' },
  { id: 2, title: 'Java Masterclass', icon: <Database size={20} />, tag: 'Intermediate', desc: "Advanced OOPs and data structures.", gradient: 'from-orange-500 to-red-600' },
  { id: 3, title: 'Web Development', icon: <Globe size={20} />, tag: 'Advanced', desc: "Full stack MERN development.", gradient: 'from-teal-500 to-emerald-600' },
  { id: 4, title: 'App Development', icon: <Smartphone size={20} />, tag: 'Intermediate', desc: "Build iOS and Android apps.", gradient: 'from-purple-500 to-pink-600' },
  { id: 5, title: 'UI/UX Design', icon: <LayoutTemplate size={20} />, tag: 'All Levels', desc: "Figma and design systems.", gradient: 'from-pink-500 to-rose-600' },
  { id: 6, title: 'AI & Data Science', icon: <Cpu size={20} />, tag: 'Advanced', desc: "Machine learning fundamentals.", gradient: 'from-cyan-500 to-blue-600' },
];

export default function CodingCourses({ title, subtitle }) {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14">
          <SectionHeading 
            title={title || "Future-Ready Tech Skills"} 
            subtitle={subtitle || "Equip yourself with the most in-demand technical skills for the modern digital economy."}
          />
          <Link href="/courses?category=Computer" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors pb-6 group">
            View All Tech Courses <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {codingCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/courses?category=Computer`} className="group relative block bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-1 p-7 rounded-2xl transition-all duration-500 overflow-hidden">
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gold flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {course.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all duration-300">
                    {course.tag}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-xl text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-300 tracking-tight">{course.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{course.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
