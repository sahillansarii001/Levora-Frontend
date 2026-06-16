'use client';
import { useState, useEffect } from 'react';
import { ClipboardList, Clock, CheckCircle2, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchAssignments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments/student`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAssignments(data.data);
      } else {
        setError(data.message || 'Failed to fetch assignments');
      }
    } catch (err) {
      setError('Network error fetching assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleMarkComplete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/assignments/${id}/complete`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchAssignments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Network error marking as complete');
    }
  };

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Assignments</h1>
          <p className="text-sm text-slate-500 mt-1">View your pending and completed assignments.</p>
          {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-semibold">{error}</div>}
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="text-sky" size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No pending assignments</h2>
            <p className="text-slate-500">You're all caught up! Check back later for new assignments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map(assignment => (
              <div key={assignment._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className={`h-2 w-full ${assignment.isCompleted ? 'bg-emerald-500' : 'bg-gold'}`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-navy bg-slate-10 px-2 py-1 rounded border border-slate-200">
                      <BookOpen size={12} className="mr-1" /> {assignment.subject}
                    </span>
                    {assignment.isCompleted && <span className="text-emerald-500 font-bold text-xs flex items-center"><CheckCircle2 size={14} className="mr-1"/> Done</span>}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">{assignment.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-3">{assignment.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex items-center text-sm font-medium text-slate-500">
                      <Calendar size={16} className="mr-2 text-slate-400" />
                      Due: <span className="ml-1 text-slate-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>

                    {assignment.fileUrl && (
                      <a href={assignment.fileUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        <ExternalLink size={16} className="mr-1" /> View Attachment
                      </a>
                    )}
                    
                    {!assignment.isCompleted ? (
                      <button 
                        onClick={() => handleMarkComplete(assignment._id)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex justify-center items-center"
                      >
                        <CheckCircle2 size={18} className="mr-2" /> Mark as Completed
                      </button>
                    ) : (
                      <div className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 flex justify-center items-center">
                        <CheckCircle2 size={18} className="mr-2" /> Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
