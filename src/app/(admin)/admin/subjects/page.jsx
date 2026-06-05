'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search, Plus, Edit, Trash2, Tag, Layers, Check, X } from 'lucide-react';

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    fee: 0,
    batches: []
  });
  const [customBatch, setCustomBatch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const availableBatches = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Other'];

  const openEditModal = (sub) => {
    const isStandardBatch = (b) => availableBatches.includes(b) && b !== 'Other';
    const standardBatches = sub.batches.filter(isStandardBatch);
    const customBatches = sub.batches.filter(b => !isStandardBatch(b));
    
    let nextBatches = [...standardBatches];
    let nextCustomBatch = '';
    
    if (customBatches.length > 0) {
      nextBatches.push('Other');
      nextCustomBatch = customBatches[0];
    }

    setFormData({
      title: sub.title,
      courseCode: sub.courseCode,
      fee: sub.fee || 0,
      batches: nextBatches
    });
    setCustomBatch(nextCustomBatch);
    setEditingId(sub._id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSubjects(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch subjects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBatch = (batch) => {
    setFormData(prev => {
      const isSelected = prev.batches.includes(batch);
      return {
        ...prev,
        batches: isSelected 
          ? prev.batches.filter(b => b !== batch) 
          : [...prev.batches, batch]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const finalBatches = formData.batches.filter(b => b !== 'Other');
      if (formData.batches.includes('Other') && customBatch.trim()) {
        finalBatches.push(customBatch.trim());
      }
      
      const payload = { ...formData, batches: finalBatches };

      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses`;

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({ title: '', courseCode: '', fee: 0, batches: [] });
        setCustomBatch('');
        setEditingId(null);
        fetchSubjects();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Failed to create subject', err);
    }
  };

  const filteredSubjects = subjects.filter(sub => 
    sub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subject & Batch Management</h1>
          <p className="text-sm text-slate-500 mt-1">Create subjects and assign them to specific student batches.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ title: '', courseCode: '', fee: 0, batches: [] });
            setCustomBatch('');
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-navy text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-navy/90 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add New Subject
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
            />
          </div>
          <span className="text-sm font-semibold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full">{subjects.length} Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Assigned Batches</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading subjects...</td></tr>
              ) : filteredSubjects.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No subjects found.</td></tr>
              ) : (
                filteredSubjects.map(sub => (
                  <tr key={sub._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <BookOpen size={16} />
                      </div>
                      {sub.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">{sub.courseCode}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {sub.batches && sub.batches.length > 0 ? (
                          sub.batches.map(batch => (
                            <span key={batch} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                              {batch}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs italic text-slate-400">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(sub)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">{editingId ? 'Edit Subject' : 'Add New Subject'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy text-sm" placeholder="e.g. Advanced Physics" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Course Code</label>
                <input required type="text" name="courseCode" value={formData.courseCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy text-sm font-mono uppercase" placeholder="e.g. PHY-101" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><Layers size={16} className="text-navy" /> Assign to Batches</label>
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  {availableBatches.map(batch => {
                    const isSelected = formData.batches.includes(batch);
                    return (
                      <button
                        key={batch}
                        type="button"
                        onClick={() => toggleBatch(batch)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          isSelected 
                            ? 'bg-navy text-white border-navy shadow-sm' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check size={12} />} {batch}
                      </button>
                    );
                  })}
                </div>
                {formData.batches.includes('Other') && (
                  <div className="mt-3">
                    <input 
                      type="text" 
                      value={customBatch}
                      onChange={(e) => setCustomBatch(e.target.value)}
                      placeholder="Enter custom batch name (e.g. Target-2025)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                      required
                    />
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-2">Only students in these assigned batches will see this subject on their dashboard.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 font-bold text-sm bg-navy text-white rounded-lg hover:bg-navy/90 shadow-sm transition-colors">{editingId ? 'Save Changes' : 'Create Subject'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
