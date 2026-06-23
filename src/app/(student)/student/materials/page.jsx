'use client';
import { FileText, Download, Search, Filter, HardDrive, FileArchive } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/materials`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          // Map DB schema to UI schema
          const categoryMap = {
            'notes': 'Notes',
            'handwritten': 'Notes',
            'formula': 'Notes',
            'pyqs': 'Past Papers',
            'worksheet': 'Assignments',
            'assignment': 'Assignments'
          };

          const formattedMaterials = data.data.map(m => ({
            id: m.id,
            title: m.title,
            type: m.type || 'PDF', // Assuming you might add this later
            size: m.size || '2.4 MB', // Placeholder for file size
            date: new Date(m.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            category: categoryMap[m.category] || 'Other',
            uploadedBy: m.uploadedBy || 'Admin'
          }));
          setMaterials(formattedMaterials);
        }
      } catch (err) {
        console.error('Failed to fetch materials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(m => 
    (activeTab === 'All' || m.category === activeTab) &&
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText className="text-red-500" size={24} />;
      case 'DOCX': return <FileText className="text-blue-500" size={24} />;
      case 'ZIP': return <FileArchive className="text-amber-500" size={24} />;
      default: return <FileText className="text-slate-500" size={24} />;
    }
  };

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Study Materials</h1>
            <p className="text-sm text-slate-500 mt-1">Access and download your course resources.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] shadow-sm bg-white" 
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 transition-colors">
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <HardDrive className="text-indigo-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">Storage Used</p>
              <div className="flex items-end gap-2">
                <h4 className="text-xl font-bold text-slate-900">128 MB</h4>
                <p className="text-xs font-medium text-slate-400 mb-1">of 5 GB</p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>2.5% Used</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '2.5%' }}></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar gap-2">
          {['All', 'Notes', 'Assignments', 'Past Papers', 'Solutions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-[var(--color-navy)] text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <div key={material.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getIcon(material.type)}
                  </div>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                    {material.type}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-1 group-hover:text-[var(--color-navy)] transition-colors line-clamp-2">
                    {material.title}
                  </h3>
                  <div className="flex items-center text-xs font-medium text-slate-400 gap-3">
                    <span>{material.size}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{material.date}</span>
                  </div>
                  <div className="mt-1 text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded inline-block">
                    By: {material.uploadedBy}
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-slate-500">{material.category}</span>
                  <button className="w-8 h-8 rounded-full bg-[var(--color-sky)]/10 text-[var(--color-sky)] flex items-center justify-center hover:bg-[var(--color-sky)] hover:text-white transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-2xl border-dashed">
              <FileText className="text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No files found</h3>
              <p className="text-slate-500 text-sm">We couldn't find any materials matching your criteria.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
