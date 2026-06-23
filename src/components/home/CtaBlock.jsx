'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function CtaBlock({ title, subtitle }) {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-xl"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-gold)]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4 relative z-10">
            {title || "Ready to secure your child's future?"}
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            {subtitle || "Join Levora Academy today and experience personalized coaching that drives real results."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link prefetch={false}href="/admissions" className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
              Book Free Demo Class <ArrowRight size={18} />
            </Link>
            <a href="tel:+918169976265" className="w-full sm:w-auto px-7 py-3 rounded-lg font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2">
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
