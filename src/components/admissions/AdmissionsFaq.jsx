'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AdmissionsFaq({ title, questions }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const defaultFaqs = [
    { q: "What courses does Levora Academy offer?", a: "We offer programs spanning School Foundation (Class 1-10), JEE & NEET prep, Python, Web Development, and Spoken English." },
    { q: "When do admissions open for the 2025–26 batch?", a: "Admissions are currently open for the 2025-26 academic session. Batches begin in April 2025." },
    { q: "Is there an entrance test to join Levora Academy?", a: "Yes, for our advanced JEE/NEET batches, we conduct an LEAT (Levora Entrance and Admission Test) to assess current proficiency and offer scholarships." },
    { q: "Does Levora Academy offer online classes?", a: "Yes, we provide full hybrid and online-only cohorts for students across India, featuring live interactive sessions." },
    { q: "What is the fee structure at Levora Academy?", a: "Fees vary based on the grade and program. Our foundation courses start at ₹25,000/year, and premium JEE/NEET programs range from ₹80,000 to ₹1,20,000/year." }
  ];

  const faqsToRender = questions || defaultFaqs;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6">{title || "Frequently Asked Questions"}</h2>
      <div className="space-y-3">
        {faqsToRender.map((faq, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
            <button 
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span>{faq.q || faq.question}</span>
              {activeFaq === i ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>
            <div 
              className={`px-4 text-sm text-slate-600 transition-all duration-300 ease-in-out ${activeFaq === i ? 'py-4 border-t border-slate-100 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
            >
              {faq.a || faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
