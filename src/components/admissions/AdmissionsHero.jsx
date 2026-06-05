'use client';

import { ArrowRight } from 'lucide-react';

export default function AdmissionsHero({ title, subtitle }) {
  return (
    <section className="bg-[var(--color-navy)] py-20 px-4 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
          {title || "Admissions Open for 2025–26 Batch"}
        </h1>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          {subtitle || "Join India's premier coaching institute. Secure your seat today for a brighter tomorrow in school academics and competitive exams."}
        </p>
        <a href="#apply" className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold py-3 px-8 rounded-full hover:bg-[var(--color-gold-dark)] transition-colors">
          Apply Now <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
