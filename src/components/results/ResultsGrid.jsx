'use client';

import { useState, useEffect } from 'react';
import SectionHeading from '../shared/SectionHeading';
import { Trophy, Medal, Star } from 'lucide-react';
import { fetchResults } from '@/lib/api';

export default function ResultsGrid({ title, subtitle }) {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      const data = await fetchResults();
      const mapped = data.map(r => ({
        id: r._id,
        name: r.studentName,
        exam: r.board || r.course,
        rank: r.rank ? `AIR ${r.rank}` : (r.percentage ? `${r.percentage}%` : r.score),
        year: r.year
      }));
      setToppers(mapped);
      setLoading(false);
    };
    loadResults();
    // Removed aggressive polling
    
  }, []);

  return (
    <section className="pt-28 pb-28 bg-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Our Wall of Fame"} 
          subtitle={subtitle || "Celebrating the extraordinary achievements of our brilliant students."}
          centered
        />

        {/* Board Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 mt-4 max-w-4xl mx-auto">
          <div className="relative bg-gold p-8 rounded-2xl text-center text-white shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <Trophy size={44} className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-white">250+</h3>
            <p className="text-white/80 font-medium">Students scored above 95% in Board Exams</p>
          </div>
          <div className="relative bg-gold p-8 rounded-2xl text-center text-white shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <Medal size={44} className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-white">150+</h3>
            <p className="text-white/80 font-medium">IIT & NIT Selections in 2024</p>
          </div>
          <div className="relative bg-gold p-8 rounded-2xl text-center text-white shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <Star size={44} className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-white">50+</h3>
            <p className="text-white/80 font-medium">Top Medical College Admissions</p>
          </div>
        </div>

        {/* Toppers Grid */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <h3 className="text-lg font-bold text-[var(--color-navy)] uppercase tracking-widest">Top Performers</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 rounded-full border-2 border-[var(--color-gold)] border-t-transparent animate-spin mb-4" />
            <p className="text-lg font-bold text-[var(--color-navy)]">Loading results...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {toppers.length > 0 ? toppers.map((topper) => (
              <div key={topper.id} className="group bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] flex items-center justify-center mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500">
                    <span className="text-2xl font-bold text-[var(--color-gold)]">
                      {topper.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-[var(--color-navy)] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                    {topper.year}
                  </div>
                </div>
                <h3 className="font-bold text-[var(--color-navy)] mb-1 text-sm md:text-base">{topper.name}</h3>
                <p className="gradient-text font-bold text-lg leading-tight mb-1">{topper.rank}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{topper.exam}</p>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-slate-400 font-medium">
                No results found yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
