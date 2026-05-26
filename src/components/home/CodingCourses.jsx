'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Terminal, Database, Smartphone, Globe, LayoutTemplate, Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const codingCourses = [
  { id: 1, title: 'Python Programming', icon: <Terminal size={20} />, tag: 'Beginner', desc: "Learn logic building and core Python." },
  { id: 2, title: 'Java Masterclass', icon: <Database size={20} />, tag: 'Intermediate', desc: "Advanced OOPs and data structures." },
  { id: 3, title: 'Web Development', icon: <Globe size={20} />, tag: 'Advanced', desc: "Full stack MERN development." },
  { id: 4, title: 'App Development', icon: <Smartphone size={20} />, tag: 'Intermediate', desc: "Build iOS and Android apps." },
  { id: 5, title: 'UI/UX Design', icon: <LayoutTemplate size={20} />, tag: 'All Levels', desc: "Figma and design systems." },
  { id: 6, title: 'AI & Data Science', icon: <Cpu size={20} />, tag: 'Advanced', desc: "Machine learning fundamentals." },
];

export default function CodingCourses() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Future-Ready Tech Skills" 
            subtitle="Equip yourself with the most in-demand technical skills for the modern digital economy."
          />
          <Link href="/courses?category=Computer" className="hidden md:inline-flex items-center text-sm font-semibold text-navy hover:text-gold transition-colors pb-6">
            View All Tech Courses <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/courses?category=Computer`} className="block bg-white border border-slate-200 hover:border-navy hover:shadow-lg p-6 rounded-2xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 text-navy rounded-xl group-hover:bg-navy group-hover:text-white transition-colors">
                    {course.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-500">
                    {course.tag}
                  </span>
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-navy transition-colors tracking-tight">{course.title}</h4>
                <p className="text-sm text-slate-500 font-medium">{course.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
