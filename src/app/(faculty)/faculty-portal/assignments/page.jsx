'use client';
import { BookOpen, Plus, Search, Filter, FileText, Calendar, MoreVertical, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    className: '',
    dueDate: '',
  });

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments/faculty`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAssignments(data.data);
      }

      // Also fetch classes for the dropdowns
      const userStr = localStorage.getItem('user');
      let facultyIdQuery = '';
      if (userStr) {
        const user = JSON.parse(userStr);
        const facultyId = user.id || user.id;
        if (facultyId) facultyIdQuery = `?facultyId=${facultyId}`;
      }
      
      if (facultyIdQuery) {
        const classRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses${facultyIdQuery}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const classData = await classRes.json();
        if (classData.success && classData.data) {
          setMyClasses(classData.data);
          // Set defaults if possible
          if (classData.data.length > 0 && !formData.subject) {
            setFormData(prev => ({
              ...prev,
              subject: classData.data[0].title,
              className: classData.data[0].batches?.[0] || classData.data[0].category || 'Class'
            }));
          }
        }
      }
    } catch (err) {
        console.error('Failed to fetch assignments', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', subject: '', className: '', dueDate: '' });
        fetchAssignments();
      } else {
        alert(data.message || 'Error creating assignment');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create assignment');
    }
  };

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Assignments</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and grade student assignments.</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[var(--color-navy)] text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search assignments..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Assignments List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-12 text-center text-slate-500 font-medium">Loading assignments...</div>
            ) : assignments.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <BookOpen size={48} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Assignments Yet</h3>
                <p className="text-sm text-slate-500 max-w-sm">There are no assignments assigned to you yet. Once an administrator adds them, they will appear here.</p>
              </div>
            ) : (
              assignments.map((assignment) => (
                <div key={assignment.id || assignment.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl mt-1 ${assignment.status === 'active' ? 'bg-slate-100 text-gold-dark' : 'bg-slate-100 text-emerald'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-poppins">{assignment.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-slate-400" /> {assignment.class || assignment.course?.name || 'Class'}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" /> Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      {assignment.submittedStudents && assignment.submittedStudents.length > 0 && (
                        <div className="mt-3 text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-100 inline-flex items-center gap-2">
                          <span className="font-bold">Submitted by:</span> {assignment.submittedStudents.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{assignment.submissions || 0}/{assignment.total || 0}</p>
                      <p className="text-xs font-medium text-slate-500">Submitted</p>
                    </div>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full rounded-full ${assignment.status === 'active' ? 'bg-gold' : 'bg-emerald'}`} 
                        style={{ width: `${Math.min(100, Math.max(0, ((assignment.submissions || 0) / (assignment.total || 1)) * 100))}%` }}
                      />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Create Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 font-poppins">Create Assignment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateAssignment} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => {
                        const newSubj = e.target.value;
                        const matchingClass = myClasses.find(c => c.title === newSubj);
                        const newBatch = matchingClass?.batches?.[0] || matchingClass?.category || 'Class';
                        setFormData({...formData, subject: newSubj, className: newBatch});
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all"
                    >
                      {myClasses.length === 0 && <option value="">Loading...</option>}
                      {myClasses.map(c => (
                        <option key={c.id || c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Class/Batch</label>
                    <select 
                      required
                      value={formData.className}
                      onChange={(e) => setFormData({...formData, className: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all"
                    >
                      {(() => {
                        const matchingClass = myClasses.find(c => c.title === formData.subject);
                        if (!matchingClass) return <option value={formData.className}>{formData.className}</option>;
                        const batches = matchingClass.batches?.length > 0 ? matchingClass.batches : [matchingClass.category || 'Class'];
                        return batches.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ));
                      })()}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    rows="3"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-navy)]/20 focus:border-[var(--color-navy)] outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[var(--color-navy)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
