'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Trophy, Star, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const toppers = [
  { id: 1, name: "Rahul Deshmukh", exam: "JEE Advanced", rank: "AIR 45", image: "https://ui-avatars.com/api/?name=Rahul+D&background=F1F5F9&color=0F172A" },
  { id: 2, name: "Priya Sharma", exam: "NEET UG", rank: "AIR 112", image: "https://ui-avatars.com/api/?name=Priya+S&background=F1F5F9&color=0F172A" },
  { id: 3, name: "Amit Patel", exam: "CBSE 12th", rank: "99.2%", image: "https://ui-avatars.com/api/?name=Amit+P&background=F1F5F9&color=0F172A" },
];

export default function ResultsSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <SectionHeading 
              title="Legacy of Excellence" 
              subtitle="Consistently producing top ranks in the toughest competitive exams."
            />
            
            <div className="space-y-8 mt-10">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">500+</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Selections in IIT/NIT</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">1000+</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Doctors Produced</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-gold rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">95%+</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Board Top Scorers</p>
                </div>
              </div>
            </div>
            
            <Link href="/results" className="inline-flex items-center text-navy font-bold hover:text-gold transition-colors mt-10">
              View All 2023 Results <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {toppers.map((topper, index) => (
                <motion.div
                  key={topper.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow relative"
                >
                  <img 
                    src={topper.image} 
                    alt={topper.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-slate-200 shadow-sm object-cover"
                  />
                  <h4 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{topper.name}</h4>
                  <p className="text-navy font-bold text-lg mb-3">{topper.rank}</p>
                  <span className="bg-white border border-slate-200 text-slate-600 font-semibold text-xs px-3 py-1.5 rounded-md inline-block uppercase tracking-wider">
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
