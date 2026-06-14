'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function HeroSection({ title, subtitle, bg_image }) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-navy)]/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-8 lg:pt-24 lg:pb-12 flex flex-col justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <Link href="/admissions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 px-4 py-1.5 rounded-full text-sm font-bold text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-6 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform"
              >
                <Sparkles size={14} />
                <span>Admissions Open for 2025-26 Batch</span>
              </motion.div>
            </Link>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-[var(--color-navy)] mb-4 leading-[1.05] tracking-tight"
            >
              {title ? (
                <span>{title}</span>
              ) : (
                <>Master Your Future with {' '}
                  <span className="gradient-text">Premium Education.</span>
                </>
              )}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg text-slate-500 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {subtitle || "Experience a world-class learning ecosystem. From school foundations to competitive exams like JEE and NEET, we build the leaders of tomorrow."}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/admissions" className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 text-base">
                Start Learning <ArrowRight size={18} />
              </Link>
              <Link href="/courses" className="btn-outline w-full sm:w-auto text-center text-base">
                View All Courses
              </Link>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 text-xs font-medium text-slate-400 text-center lg:text-left"
            >
              Serving students across Mumbai & Pan-India online.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 sm:gap-6"
            >
              {['Top Faculty', 'Smart Classrooms', 'High Success Rate'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-[var(--color-emerald)]" />
                  </div>
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image/Visual side */}
          <div className="lg:w-1/2 relative w-full hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-navy)]/40 via-transparent to-transparent z-10" />
                <img 
                  src={bg_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt="Students studying at Levora Academy coaching center" 
                  className="w-full h-[300px] lg:h-[60vh] max-h-[500px] object-cover"
                  fetchPriority="high"
                />
              </div>

              {/* Floating stats card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px] z-20"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50"
                    style={{ background: 'linear-gradient(to bottom right, #10B981, #34D399)' }}
                  >
                    <span className="text-white font-bold text-xl">99%</span>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-navy)] text-sm">Success Rate</p>
                    <p className="text-xs text-slate-400">In Board Exams 2024</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99%' }}
                    transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, #10B981, #34D399)' }}
                  />
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-white/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-gold)] animate-pulse" />
                  <span className="text-sm font-bold text-[var(--color-navy)]">5000+ Students</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
