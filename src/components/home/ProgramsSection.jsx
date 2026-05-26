'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Book, Code, GraduationCap, Laptop, Atom, Languages, BrainCircuit, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const programs = [
  { id: 1, icon: <Atom size={24} />, title: 'Pre-Primary', desc: 'Playgroup to Nursery', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { id: 2, icon: <Book size={24} />, title: 'Primary School', desc: 'Class 1st to 5th', color: 'bg-green-50 text-green-600 border-green-100' },
  { id: 3, icon: <GraduationCap size={24} />, title: 'Middle School', desc: 'Class 6th to 10th', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 4, icon: <Book size={24} />, title: 'Higher Secondary', desc: 'Class 11th & 12th', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { id: 5, icon: <BrainCircuit size={24} />, title: 'JEE / NEET Prep', desc: 'Competitive Exams', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { id: 6, icon: <Code size={24} />, title: 'Coding Courses', desc: 'Python, Java, Web', color: 'bg-sky-50 text-sky-600 border-sky-100' },
  { id: 7, icon: <Languages size={24} />, title: 'Spoken English', desc: 'Fluency & Grammar', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { id: 8, icon: <Laptop size={24} />, title: 'Computer Skills', desc: 'MS Office, Tally', color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export default function ProgramsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Premium Programs" 
            subtitle="Expertly crafted curriculums designed to nurture potential at every stage of learning."
          />
          <Link href="/courses" className="hidden md:inline-flex items-center text-sm font-semibold text-navy hover:text-gold transition-colors pb-6">
            Explore All Programs <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/courses?category=${program.title}`} className="block group bg-white rounded-2xl p-6 border border-slate-200 hover:border-navy/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${program.color} transition-transform group-hover:scale-110`}>
                    {program.icon}
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-navy transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-navy transition-colors">{program.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{program.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/courses" className="btn-outline w-full inline-block">
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
