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
    const interval = setInterval(loadMaterials, 3000); // Real-time polling
    return () => clearInterval(interval);
  }, []);

  const filteredMaterials = subject === 'All' ? materials : materials.filter(m => m.subject === subject);

  return (
    <section className="pt-20 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Study Materials & Downloads"} 
          subtitle={subtitle || "Access premium Levora notes, formula sheets, and past year question papers."}
          centered={true}
        />

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 mt-12">
          <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2">
            {['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer'].map(sub => (
              <button 
                key={sub}
                onClick={() => setSubject(sub)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${subject === sub ? 'bg-gold text-navy' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sub}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Search materials..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-navy" />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMaterials.map(item => (
            <div key={item.id} className="border border-gray-200 p-6 rounded-xl flex items-start justify-between hover:border-gold transition-colors hover:shadow-md">
              <div className="flex items-start">
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mr-4">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">{item.title}</h4>
                  <div className="flex space-x-3 text-sm text-gray-500">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
              <button className="text-sky hover:text-navy bg-sky/10 hover:bg-sky/20 p-2 rounded-full transition-colors">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
