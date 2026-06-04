'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Trophy, Star, TrendingUp, ChevronRight, Medal } from 'lucide-react';
import Link from 'next/link';

const toppers = [
  { id: 1, name: "Rahul Deshmukh", exam: "JEE Advanced", rank: "AIR 45", color: "from-amber-500 to-orange-600" },
  { id: 2, name: "Priya Sharma", exam: "NEET UG", rank: "AIR 112", color: "from-green-500 to-teal-600" },
  { id: 3, name: "Amit Patel", exam: "CBSE 12th", rank: "99.2%", color: "from-blue-500 to-indigo-600" },
];

const achievements = [
  { icon: <Trophy size={20} />, value: "500+", label: "Selections in IIT/NIT" },
  { icon: <Medal size={20} />, value: "1000+", label: "Doctors Produced" },
  { icon: <TrendingUp size={20} />, value: "95%+", label: "Board Top Scorers" },
];

export default function ResultsSection() {
  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--color-navy)]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <SectionHeading 
              title="Legacy of Excellence" 
              subtitle="Consistently producing top ranks in the toughest competitive exams."
            />
            
            <div className="space-y-4 mt-10">
              {achievements.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-[var(--color-gold)]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center flex-shrink-0 text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[var(--color-navy)] tracking-tight">{item.value}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/results" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors mt-8 group">
              View All 2024 Results <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {toppers.map((topper, index) => (
                <motion.div
                  key={topper.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 text-center border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topper.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Avatar */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${topper.color} mx-auto mb-5 flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-500`}>
                    <span className="text-3xl font-bold text-white">
                      {topper.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-[var(--color-navy)] mb-1">{topper.name}</h4>
                  <p className="text-2xl font-bold gradient-text mb-4">{topper.rank}</p>
                  <span className="inline-block bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg uppercase tracking-wider group-hover:bg-[var(--color-navy)] group-hover:text-white group-hover:border-[var(--color-navy)] transition-all duration-300">
                    {topper.exam}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
