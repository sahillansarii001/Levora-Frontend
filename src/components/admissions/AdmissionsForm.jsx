'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AdmissionsForm({ title, subtitle }) {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus(''), 5000);
    e.target.reset();
  };

  return (
    <div id="apply" className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-28">
      <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">{title || "Inquiry Form"}</h2>
      <p className="text-slate-500 mb-8 text-sm">{subtitle || "Fill out the form below and our counseling team will get back to you shortly."}</p>
      
      {formStatus === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 text-[var(--color-emerald)] text-sm rounded-xl border border-emerald-100 font-medium flex items-center gap-2">
          <CheckCircle2 size={18} />
          Your inquiry has been submitted successfully! We will contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
          <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="Student's Name" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
          <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="+91 98765 43210" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Class Applying For</label>
          <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm appearance-none">
            <option value="">Select Class</option>
            <option value="6-10">Foundation (Class 6-10)</option>
            <option value="11-12-JEE">JEE (Class 11, 12, Dropper)</option>
            <option value="11-12-NEET">NEET (Class 11, 12, Dropper)</option>
            <option value="Tech">Coding & Tech Skills</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Message (Optional)</label>
          <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm resize-none" placeholder="Any specific questions?"></textarea>
        </div>

        <button type="submit" className="w-full bg-[var(--color-navy)] text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}
