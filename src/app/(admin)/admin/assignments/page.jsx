'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, ClipboardList, X, Calendar, BookOpen, Users } from 'lucide-react';

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    className: '',
    dueDate: '',
    fileUrl: ''
  });
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    setMounted(true);
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAssignments(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch assignments', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', subject: '', className: '', dueDate: '', fileUrl: '' });
        fetchAssignments();
      } else {
        setError(data.message || 'Failed to create assignment');
      }
    } catch (err) {
      setError('Network error occurred while saving.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchAssignments();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Manage Assignments</h1>
          <p className="text-sm text-slate-500 mt-1">Create and track assignments for classes.</p>
        </div>
        <button 
          onClick={() => { setError(''); setIsModalOpen(true); }}
          className="btn-primary inline-flex items-center text-sm px-5"
        >
          <Plus size={18} className="mr-2" /> Assign New
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-slate-100 m-6 rounded-2xl">
            <ClipboardList className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Assignments Created</h3>
            <p className="text-slate-500">You haven't assigned any homework or tasks yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Title & Subject</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Completions</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((assignment) => (
                  <tr key={assignment._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{assignment.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{assignment.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-md text-xs">
                        <Users size={14} className="mr-1.5" />
                        {assignment.className}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-600">
                        <Calendar size={14} className="mr-1.5 text-slate-400" />
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md text-xs">
                        {assignment.submissions?.filter(s => s.status === 'completed').length || 0} students
                      </div>
                      {(() => {
                        const completed = assignment.submissions?.filter(s => s.status === 'completed');
                        if (completed && completed.length > 0) {
                          const names = completed.map(s => s.studentId ? s.studentId.name : 'Unknown').join(', ');
                          return (
                            <div className="mt-2 text-xs text-emerald-700 bg-emerald-50/50 p-1.5 rounded border border-emerald-100 max-w-[200px] truncate" title={names}>
                              <span className="font-bold">By:</span> {names}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleDelete(assignment._id)} 
                          className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && mounted && document.body ? (
        createPortal(
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold font-poppins text-slate-900">Create New Assignment</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assignment Title</label>
                  <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="e.g. Chapter 1 Exercises" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description / Instructions</label>
                  <textarea required rows="3" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none resize-y" placeholder="Detail what needs to be done..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input required type="text" value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="e.g. Physics" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Class / Grade</label>
                    <input required type="text" value={formData.className} onChange={e=>setFormData({...formData, className: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="e.g. Class 10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input required type="date" value={formData.dueDate} onChange={e=>setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Attachment Link (Optional)</label>
                  <input type="text" value={formData.fileUrl} onChange={e=>setFormData({...formData, fileUrl: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="https://..." />
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                  <button type="submit" className="bg-gold hover:bg-yellow-500 text-navy px-6 py-2 rounded-lg font-bold shadow-sm transition-colors">Create Assignment</button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      ) : null}
    </div>
  );
}
