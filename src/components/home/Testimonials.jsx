'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  { 
    id: 1, 
    type: 'parent',
    name: "Ramesh Singh", 
    role: "Parent of Class 10th Student", 
    quote: "Levora Academy has completely transformed my son's approach to studying. The teachers are highly supportive and provide weekly progress updates that keep us informed.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Ramesh+Singh&background=0B1D3A&color=F59E0B"
  },
  { 
    id: 2, 
    type: 'student',
    name: "Neha Gupta", 
    role: "JEE Aspirant", 
    quote: "The mock test analysis here is top-notch. It helped me identify my weak points in Physics. I owe my IIT selection to the dedicated faculty and small batch sizes.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=10B981&color=fff"
  },
  { 
    id: 3, 
    type: 'student',
    name: "Vikram Joshi", 
    role: "CBSE 12th Board", 
    quote: "The personal mentorship I received was exactly what I needed. The teachers gave me individual attention and helped me score 95% in my board exams.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Vikram+Joshi&background=0EA5E9&color=fff"
  }
];

const gradientBorders = [
  'from-indigo-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
];

export default function Testimonials({ title, subtitle }) {
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Use the public testimonials endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/testimonials/public`);
        const json = await res.json();
        if (json.success) {
          setTestimonialsList(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null;
  const displayTestimonials = testimonialsList.length > 0 ? testimonialsList : testimonials;

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-sky)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title={title || "Trusted by Parents, Loved by Students"} 
          subtitle={subtitle || "Real stories from families whose lives have been impacted by our educational ecosystem."}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {displayTestimonials.map((test, index) => (
            <motion.div
              key={test._id || test.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient top border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientBorders[index % gradientBorders.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Quote size={20} className="text-[var(--color-gold)]" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${test.isParent ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                  {test.isParent ? 'parent' : 'student'}
                </span>
              </div>
              
              <div className="flex text-[var(--color-gold)] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed text-sm">"{test.quote}"</p>
              
              <div className="flex items-center pt-6 border-t border-slate-100 mt-auto">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(test.name)}&background=0B1D3A&color=F59E0B`} alt={test.name} className="w-10 h-10 rounded-full mr-3 border border-slate-200" />
                <div>
                  <h3 className="font-bold text-[var(--color-navy)] text-sm">{test.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
