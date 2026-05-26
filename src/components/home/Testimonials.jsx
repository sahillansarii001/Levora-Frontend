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

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="What Our Community Says" 
          subtitle="Real stories from students and parents whose lives have been impacted by our educational ecosystem."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative hover:shadow-md transition-shadow"
            >
              <Quote className="text-slate-200 mb-6" size={40} />
              
              <div className="flex text-gold mb-4">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">"{test.quote}"</p>
              
              <div className="flex items-center pt-6 border-t border-slate-100">
                <div className="w-10 h-10 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-full flex items-center justify-center mr-3">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight">{test.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
