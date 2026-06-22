'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { CheckCircle2, ArrowRight, Star, Zap, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const defaultFeatures = [
  { icon: <Users size={18} />, text: "Small Batch Learning & Individual Attention" },
  { icon: <Star size={18} />, text: "Highly Experienced Faculty" },
  { icon: <Zap size={18} />, text: "Personal Mentorship & Academic Support" },
  { icon: <Trophy size={18} />, text: "Regular Testing & Progress Tracking" },
  { icon: <Users size={18} />, text: "Active Parent-Teacher Communication" },
  { icon: <CheckCircle2 size={18} />, text: "Comprehensive Study Resources" },
];

const defaultIcons = [
  <Users size={18} />, <Star size={18} />, <Zap size={18} />, <Trophy size={18} />, <CheckCircle2 size={18} />
];

export default function WhyLevora({ title, subtitle, features = {} }) {
  // Extract up to 4 features from the dynamic content
  const dynamicFeatures = [];
  for (let i = 1; i <= 6; i++) {
    const featureTitle = features[`feature_${i}_title`];
    const featureDesc = features[`feature_${i}_desc`];
    if (featureTitle) {
      dynamicFeatures.push({ title: featureTitle, desc: featureDesc, icon: defaultIcons[(i-1) % defaultIcons.length] });
    }
  }

  // Fallback to hardcoded features if no dynamic ones are found
  const displayFeatures = dynamicFeatures.length > 0 ? dynamicFeatures : defaultFeatures;

  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content side */}
          <div className="lg:w-1/2">
            <SectionHeading 
              title={title || "A holistic ecosystem for Academic Excellence."}
              subtitle={subtitle || "We go beyond traditional teaching methods. Our data-driven approach, combined with world-class faculty, ensures that every student achieves their absolute highest potential."}
            />
            
            <div className="space-y-3 mb-10">
              {displayFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-[var(--color-gold)]/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon || <Star size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-800 font-semibold text-sm">{feature.title || feature.text}</span>
                    {feature.desc && <span className="text-slate-500 text-xs mt-0.5">{feature.desc}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link prefetch={false}href="/admissions" className="btn-primary inline-flex items-center gap-2">
              Enroll for 2025 Batch <ArrowRight size={18} />
            </Link>
          </div>

          {/* Image/Visual side */}
          <div className="lg:w-1/2 relative w-full hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] rounded-3xl transform rotate-3 scale-[1.02] opacity-30 blur-xl" />
              <div className="relative bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern Education"
                  className="w-full h-[550px] object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
                    <h3 className="text-white font-bold text-3xl mb-2">Empowering Minds</h3>
                    <p className="text-slate-300 font-medium text-lg">Join the fastest growing educational community in India.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
