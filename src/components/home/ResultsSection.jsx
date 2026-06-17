'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Users, Trophy, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const defaultToppers = [
  { _id: '1', studentName: "Rahul Deshmukh", course: "JEE Advanced", rank: "AIR 45", percentage: 99.8, color: "from-amber-500 to-orange-600" },
  { _id: '2', studentName: "Priya Sharma", course: "NEET UG", rank: "AIR 112", percentage: 99.5, color: "from-green-500 to-teal-600" },
  { _id: '3', studentName: "Amit Patel", course: "CBSE 12th", percentage: 99.2, color: "from-blue-500 to-indigo-600" },
  { _id: '4', studentName: "Neha Gupta", course: "MHT CET", percentage: 99.9, color: "from-purple-500 to-pink-600" },
  { _id: '5', studentName: "Rohan Das", course: "JEE Main", percentage: 99.8, color: "from-amber-500 to-orange-600" },
  { _id: '6', studentName: "Aditi Rao", course: "ICSE 10th", percentage: 98.8, color: "from-blue-500 to-indigo-600" },
];

const defaultAchievements = [
  { icon: <Users size={20} />, value: "Trusted", label: "by Students" },
  { icon: <Trophy size={20} />, value: "99%", label: "Success Rate" },
  { icon: <BookOpen size={20} />, value: "15+", label: "Years of Experience" },
  { icon: <TrendingUp size={20} />, value: "40%+", label: "Avg. Score Improvement" },
];

const colors = ["from-amber-500 to-orange-600", "from-green-500 to-teal-600", "from-blue-500 to-indigo-600", "from-purple-500 to-pink-600"];

export default function ResultsSection({ title, subtitle, achievementsData, linkText }) {
  const [resultsList, setResultsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/results`);
        const json = await res.json();
        if (json.success) setResultsList(json.data.slice(0, 6)); // limit to 4 toppers
      } catch (err) {
        console.error('Failed to fetch results', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const displayToppers = resultsList.length > 0 ? resultsList : defaultToppers;
  
  // Format dynamic achievements if provided from CMS, otherwise use default
  const formattedAchievements = achievementsData ? [
    { icon: <Users size={20} />, value: achievementsData.stat_1_value || "Trusted", label: achievementsData.stat_1_label || "by Students" },
    { icon: <Trophy size={20} />, value: achievementsData.stat_2_value || "99%", label: achievementsData.stat_2_label || "Success Rate" },
    { icon: <BookOpen size={20} />, value: achievementsData.stat_3_value || "15+", label: achievementsData.stat_3_label || "Years of Experience" },
    { icon: <TrendingUp size={20} />, value: achievementsData.stat_4_value || "40%+", label: achievementsData.stat_4_label || "Avg. Score Improvement" }
  ] : defaultAchievements;

  if (loading) return null;

  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--color-navy)]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <SectionHeading 
              title={title || "Legacy of Excellence"} 
              subtitle={subtitle || "Consistently producing top ranks in the toughest competitive exams."}
            />
            
            <div className="space-y-4 mt-10">
              {formattedAchievements.map((item, index) => (
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
                    <h3 className="text-2xl font-bold text-[var(--color-navy)] tracking-tight">{item.value}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/results" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors mt-8 group">
              {linkText || "View All Results"} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-2/3 lg:pl-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5 justify-center">
              {displayToppers.map((topper, index) => {
                const color = topper.color || colors[index % colors.length];
                const displayRank = topper.rank ? `AIR ${topper.rank}` : (topper.percentage ? `${topper.percentage}%` : 'Top Ranker');
                
                return (
                  <motion.div
                    key={topper._id || index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 text-center border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center w-full"
                  >
                    {/* Gradient top border */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Avatar */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full sm:rounded-xl lg:rounded-2xl bg-navy mb-2 lg:mb-5 flex items-center justify-center shadow-sm shrink-0`}>
                      <span className="text-sm sm:text-xl lg:text-3xl font-bold text-white">
                        {topper.studentName ? topper.studentName.split(' ').map(n => n[0]).join('') : '?'}
                      </span>
                    </div>
                    
                    <h3 className="text-[11px] sm:text-sm lg:text-xl font-bold text-[var(--color-navy)] mb-1 truncate w-full">{topper.studentName}</h3>
                    <p className="text-sm sm:text-lg lg:text-2xl font-bold gradient-text mb-2 lg:mb-4">{displayRank}</p>
                    <span className="inline-block bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[9px] sm:text-[10px] lg:text-xs px-2 py-1 lg:px-4 lg:py-2 rounded lg:rounded-lg uppercase tracking-wider group-hover:bg-[var(--color-navy)] group-hover:text-white group-hover:border-[var(--color-navy)] transition-all duration-300 w-full lg:w-auto truncate">
                      {topper.course}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
