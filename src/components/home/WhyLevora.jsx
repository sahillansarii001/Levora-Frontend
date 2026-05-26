'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  "Industry-Expert Faculty Members",
  "Levora Proprietary Study Notes",
  "Tech-Enabled Smart Classrooms",
  "Weekly Mock Tests & Deep Analysis",
  "One-on-One Career Mentorship",
  "24/7 Dedicated Doubt Support"
];

export default function WhyLevora() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content side */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 bg-sky/10 px-3 py-1 rounded-full text-sm font-bold text-sky mb-6 uppercase tracking-wider">
              <span>Why Choose Us</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-poppins text-slate-900 mb-6 leading-tight tracking-tight">
              A holistic ecosystem for <br/> <span className="text-navy">Academic Excellence.</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We go beyond traditional teaching methods. Our data-driven approach, combined with world-class faculty, ensures that every student achieves their absolute highest potential.
            </p>
            
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="text-gold mr-3 flex-shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <Link href="/admissions" className="btn-primary inline-flex items-center">
              Enroll for 2024 Batch <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          {/* Image/Visual side */}
          <div className="lg:w-1/2 relative w-full h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-slate-100 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-navy rounded-3xl transform -rotate-1 overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Education"
                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
                  <h3 className="text-white font-bold text-3xl mb-2">Empowering Minds</h3>
                  <p className="text-slate-300 font-medium text-lg">Join the fastest growing educational community in India.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
