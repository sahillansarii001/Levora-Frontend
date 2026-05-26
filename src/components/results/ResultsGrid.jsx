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
    const interval = setInterval(loadResults, 3000); // Real-time polling
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Our Wall of Fame"} 
          subtitle={subtitle || "Celebrating the extraordinary achievements of our brilliant students."}
          centered={true}
        />

        {/* Board Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-12">
          <div className="bg-navy p-8 rounded-2xl text-center text-white relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
            <Trophy size={48} className="mx-auto mb-4 text-gold" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-gold">250+</h3>
            <p className="text-gray-300 font-medium">Students scored above 95% in Board Exams</p>
          </div>
          <div className="bg-gold p-8 rounded-2xl text-center text-navy relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
            <Medal size={48} className="mx-auto mb-4 text-navy" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-navy">150+</h3>
            <p className="text-navy/80 font-medium">IIT & NIT Selections in 2023</p>
          </div>
          <div className="bg-sky p-8 rounded-2xl text-center text-navy relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
            <Star size={48} className="mx-auto mb-4 text-navy" />
            <h3 className="text-4xl font-bold font-poppins mb-2 text-navy">50+</h3>
            <p className="text-navy/80 font-medium">Top Medical College Admissions</p>
          </div>
        </div>

        {/* Toppers Grid */}
        <h3 className="text-2xl font-bold text-navy mb-8 border-b-2 border-gold inline-block pb-2">Top Performers</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {toppers.map((topper) => (
            <div key={topper.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="relative inline-block mb-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topper.name)}&background=0B1F3A&color=D4A017`} 
                  alt={topper.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-gold/50"
                />
                <div className="absolute -bottom-3 -right-2 bg-navy text-gold text-xs font-bold px-2 py-1 rounded-full border border-gold">
                  {topper.year}
                </div>
              </div>
              <h4 className="font-bold text-navy mb-1 text-sm md:text-base">{topper.name}</h4>
              <p className="text-gold font-bold text-lg leading-tight mb-1">{topper.rank}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{topper.exam}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
