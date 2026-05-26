'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ title, subtitle, bg_image }) {
  return (
    <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-navy mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-gold"></span>
              <span>Admissions open for 2024-25 Batch</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold font-poppins text-slate-900 mb-6 leading-[1.1] tracking-tight"
            >
              {title ? (
                <span>{title}</span>
              ) : (
                <>Master Your Future with <span className="text-navy">Premium Education.</span></>
              )}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {subtitle || "Experience a world-class learning ecosystem. From school foundations to competitive exams like JEE and NEET, we build the leaders of tomorrow."}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/admissions" className="btn-primary w-full sm:w-auto text-center flex items-center justify-center">
                Start Learning <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="/courses" className="btn-outline w-full sm:w-auto text-center bg-white">
                View All Courses
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500 font-medium"
            >
              <div className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> Top Faculty</div>
              <div className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> Smart Classrooms</div>
              <div className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-2" /> High Success Rate</div>
            </motion.div>
          </div>

          {/* Image/Visual grid */}
          <div className="lg:w-1/2 relative w-full h-[500px] hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute top-0 right-0 w-4/5 h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={bg_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                alt="Students studying" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-10 left-0 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl">
                  99%
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Success Rate</h4>
                  <p className="text-xs text-slate-500">In Board Exams 2023</p>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[99%]"></div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
