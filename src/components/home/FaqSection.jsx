'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-6 bg-slate-50 relative z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div 
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 pr-4">{question || 'Add a question here'}</h3>
            <div className={`p-2 rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={24} />
            </div>
          </div>
          
          <div 
            className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'} px-6 md:px-8 overflow-hidden`}
          >
            <div className="w-full h-px bg-slate-100 mb-6"></div>
            <div 
              className="text-slate-600 text-lg leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: answer || '<p>Add your answer here.</p>' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
