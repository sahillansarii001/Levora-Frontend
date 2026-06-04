'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  { 
    id: 1, 
    name: "Ramesh Singh", 
    role: "Parent of Class 10th Student", 
    quote: "Levora Academy has completely transformed my son's approach to studying. The self notes system is incredible and the teachers are highly supportive.",
    rating: 5
  },
  { 
    id: 2, 
    name: "Neha Gupta", 
    role: "JEE Aspirant", 
    quote: "The mock test analysis here is top-notch. It helped me identify my weak points in Physics. I owe my IIT selection to the dedicated faculty.",
    rating: 5
  },
  { 
    id: 3, 
    name: "Vikram Joshi", 
    role: "Python Course Student", 
    quote: "I took the Python basic to advanced course. The hands-on labs and real-world projects gave me the confidence to start freelancing.",
    rating: 5
  }
];

const gradientBorders = [
  'from-indigo-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-sky)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title="What Our Community Says" 
          subtitle="Real stories from students and parents whose lives have been impacted by our educational ecosystem."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-5xl mx-auto">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientBorders[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Quote icon */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <Quote size={24} className="text-[var(--color-gold)]" />
                </div>
              </div>
              
              <div className="flex text-[var(--color-gold)] mb-4 relative z-10">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed relative z-10">"{test.quote}"</p>
              
              <div className="flex items-center pt-6 border-t border-slate-100 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] text-[var(--color-gold)] font-bold flex items-center justify-center mr-3 text-sm">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-navy)] text-sm">{test.name}</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
