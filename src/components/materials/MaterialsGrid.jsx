'use client';

import { useState, useEffect } from 'react';
import SectionHeading from '../shared/SectionHeading';
import { Download, FileText, Search } from 'lucide-react';
import { fetchMaterials } from '@/lib/api';

export default function MaterialsGrid({ title, subtitle }) {
  const [subject, setSubject] = useState('All');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      const data = await fetchMaterials();
      setMaterials(data);
      setLoading(false);
    };
    loadMaterials();
    const interval = setInterval(loadMaterials, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredMaterials = subject === 'All' ? materials : materials.filter(m => m.subject === subject);

  return (
    <section className="pt-28 pb-28 bg-white min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Study Materials & Downloads"} 
          subtitle={subtitle || "Access premium Levora notes, formula sheets, and past year question papers."}
          centered
        />

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 mt-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer'].map(sub => (
              <button 
                key={sub}
                onClick={() => setSubject(sub)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  subject === sub 
                    ? 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-[var(--color-navy)] shadow-lg shadow-amber-200/50' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[var(--color-gold)]/30 hover:text-[var(--color-navy)]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search materials..." 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:bg-white transition-all text-sm" 
            />
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 rounded-full border-2 border-[var(--color-gold)] border-t-transparent animate-spin mb-4" />
            <p className="text-lg font-bold text-[var(--color-navy)]">Loading materials...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredMaterials.map(item => (
              <div key={item.id} className="group bg-white border border-slate-100 p-6 rounded-2xl flex items-start justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FileText size={22} className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-navy)] mb-1.5">{item.title}</h4>
                    <div className="flex gap-3 text-sm text-slate-400">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-medium">{item.size}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-sky)]/10 to-[var(--color-emerald)]/10 flex items-center justify-center text-[var(--color-sky)] hover:from-[var(--color-sky)] hover:to-[var(--color-emerald)] hover:text-white transition-all duration-300 flex-shrink-0 ml-4">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredMaterials.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-medium">
            No materials found for the selected subject.
          </div>
        )}
      </div>
    </section>
  );
}
