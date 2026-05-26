'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

export default function ContactInfo({ title, subtitle, address, phone, email }) {
  return (
    <section className="pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Get in Touch"} 
          subtitle={subtitle || "Have questions? We're here to help you."}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <MapPin className="text-gold" size={32} />
            </div>
            <h4 className="font-bold text-navy text-xl mb-3">Head Office</h4>
            <p className="text-gray-600 leading-relaxed">{address || '123 Education Hub, Knowledge Park, New Delhi, India'}</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Phone className="text-gold" size={32} />
            </div>
            <h4 className="font-bold text-navy text-xl mb-3">Call Us</h4>
            <p className="text-gray-600 leading-relaxed">{phone || '+91 98765 43210'}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Mail className="text-gold" size={32} />
            </div>
            <h4 className="font-bold text-navy text-xl mb-3">Email</h4>
            <p className="text-gray-600 leading-relaxed">{email || 'hello@levoraacademy.com'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
