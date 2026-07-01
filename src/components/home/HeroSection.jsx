'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

import Image from 'next/image';

export default function HeroSection({ title, subtitle, bg_image }) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* Decorative elements (reduced opacity and blur) */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 pb-8 lg:pt-24 lg:pb-12 flex flex-col justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <Link prefetch={false} href="/admissions">
              <div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 px-4 py-1.5 rounded-full text-sm font-bold text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-6 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform"
              >
                <Sparkles size={14} />
                <span>Admissions Open for 2025-26 Batch</span>
              </div>
            </Link>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-[var(--color-navy)] mb-4 leading-[1.1] tracking-tight"
            >
              {title ? (
                <span>{title}</span>
              ) : (
                <>Personalized Coaching for <br className="hidden md:block" />
                  <span className="gradient-text">KG–12 Students</span>
                </>
              )}
            </h1>
            
            <p 
              className="text-base lg:text-lg text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              {subtitle || "Expert guidance for CBSE, ICSE, State Board and Competitive Exam preparation with experienced faculty and small batch learning."}
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link prefetch={false} href="/admissions" className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 text-base">
                Book Free Demo Class <ArrowRight size={18} />
              </Link>
              <Link prefetch={false} href="/contact" className="btn-outline w-full sm:w-auto text-center text-base">
                Contact Us
              </Link>
            </div>
            
            <p 
              className="mt-4 text-xs font-medium text-slate-400 text-center lg:text-left"
            >
              Serving students across Mumbai & Pan-India online.
            </p>

            <div 
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-5"
            >
              {['KG–12 Coaching', 'CBSE | ICSE | State Board', 'Small Batches', 'Experienced Faculty', 'Regular Assessments'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[var(--color-navy)] font-semibold bg-white/50 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 size={14} className="text-[var(--color-emerald)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual side */}
          <div className="lg:w-1/2 relative w-full hidden lg:block">
            <div 
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full h-[300px] lg:h-[60vh] max-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-navy)]/40 via-transparent to-transparent z-10" />
                <Image 
                  src={bg_image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                  alt="Students studying at Levora Academy coaching center" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={true}
                />
              </div>

              {/* Floating stats card */}
              <div 
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px] z-20"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/30 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)]"
                  >
                    <span className="text-white font-bold text-xl">99%</span>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-navy)] text-sm">Success Rate</p>
                    <p className="text-xs text-slate-400">In Board Exams 2024</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)]"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div 
              className="absolute -top-4 -right-4 bg-white/95 px-5 py-3 rounded-2xl shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)]" />
                  <span className="text-sm font-bold text-[var(--color-navy)]">Trusted by Students</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
