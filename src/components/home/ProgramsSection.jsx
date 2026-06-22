'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Book, Code, GraduationCap, Laptop, Atom, Languages, BrainCircuit, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const programs = [
  { id: 1, icon: <Atom size={22} />, title: 'Pre-Primary', desc: 'Playgroup to Nursery', gradient: 'from-indigo-500 to-indigo-600' },
  { id: 2, icon: <Book size={22} />, title: 'Primary School', desc: 'Class 1st to 5th', gradient: 'from-green-500 to-green-600' },
  { id: 3, icon: <GraduationCap size={22} />, title: 'Middle School', desc: 'Class 6th to 10th', gradient: 'from-blue-500 to-blue-600' },
  { id: 4, icon: <Book size={22} />, title: 'Higher Secondary', desc: 'Class 11th & 12th', gradient: 'from-purple-500 to-purple-600' },
  { id: 5, icon: <BrainCircuit size={22} />, title: 'JEE / NEET Prep', desc: 'Competitive Exams', gradient: 'from-rose-500 to-rose-600' },
  { id: 6, icon: <Code size={22} />, title: 'Coding Courses', desc: 'Python, Java, Web', gradient: 'from-cyan-500 to-cyan-600' },
  { id: 7, icon: <Languages size={22} />, title: 'Spoken English', desc: 'Fluency & Grammar', gradient: 'from-amber-500 to-amber-600' },
  { id: 8, icon: <Laptop size={22} />, title: 'Computer Skills', desc: 'MS Office, Tally', gradient: 'from-slate-500 to-slate-600' },
];

export default function ProgramsSection({ title, subtitle }) {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14">
          <SectionHeading 
            title={title || "Premium Programs"} 
            subtitle={subtitle || "Expertly crafted curriculums designed to nurture potential at every stage of learning."}
          />
          <Link prefetch={false}href="/courses" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors pb-6 group">
            Explore All Programs 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link prefetch={false}href={`/courses?category=${program.title}`} className="group relative block bg-white rounded-2xl p-7 border border-slate-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-2xl bg-navy flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {program.icon}
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-[var(--color-navy)] mb-1.5 group-hover:text-[var(--color-gold)] transition-colors duration-300">{program.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{program.desc}</p>
                </div>

                {/* Arrow on hover */}
                <div className="relative z-10 mt-4 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[var(--color-gold)] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link prefetch={false}href="/courses" className="btn-outline w-full inline-block">
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
