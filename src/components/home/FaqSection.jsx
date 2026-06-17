'use client';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-2 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div 
          className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle size={18} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-navy)]">{question || 'Add a question here'}</h3>
            </div>
            <div className={`w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-[var(--color-gold)]/10' : ''}`}>
              <ChevronDown size={18} className={`transition-colors duration-300 ${isOpen ? 'text-[var(--color-gold)]' : 'text-slate-400'}`} />
            </div>
          </div>
          
          <div 
            className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'} px-6 md:px-8 overflow-hidden`}
          >
            <div className="w-full h-px bg-gradient-to-r from-[var(--color-gold)]/20 via-slate-200 to-transparent mb-6" />
            <div 
              className="text-slate-600 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: answer || '<p>Add your answer here.</p>' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
