'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const items = [
  { 
    icon: <MapPin size={24} />, label: 'Head Office', 
    value: '123 Education Hub, Knowledge Park, New Delhi, India',
    gradientFrom: '#0B1D3A', gradientTo: '#1E3A5F'
  },
  { 
    icon: <Phone size={24} />, label: 'Call Us', 
    value: '+91 98765 43210',
    gradientFrom: '#F59E0B', gradientTo: '#D97706'
  },
  { 
    icon: <Mail size={24} />, label: 'Email', 
    value: 'hello@levoraacademy.com',
    gradientFrom: '#0EA5E9', gradientTo: '#10B981'
  },
];

export default function ContactInfo({ title, subtitle, address, phone, email }) {
  return (
    <section className="pt-24 pb-12 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title={title || "Get in Touch"} 
          subtitle={subtitle || "Have questions? We're here to help you."}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 text-center overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, ${item.gradientFrom}, ${item.gradientTo})` }}
              />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500"
                style={{ background: `linear-gradient(to bottom right, ${item.gradientFrom}, ${item.gradientTo})` }}
              >
                <div className="text-white">{item.icon}</div>
              </div>
              <h3 className="font-bold text-[var(--color-navy)] text-xl mb-3">{item.label}</h3>
              <p className="text-slate-500 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
