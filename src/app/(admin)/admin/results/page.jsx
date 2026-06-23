'use client';

import { useState, useEffect } from 'react';
import { Plus, X, Search, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    studentId: '',
    examName: '',
    subject: '',
    marksObtained: '',
    totalMarks: '',
    remarks: '',
    examDate: new Date().toISOString().split('T')[0]
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchResults();
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSubjects(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResults = async (search = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = new URL(`${API_BASE}/exam-results`);
      if (search) url.searchParams.append('search', search);
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/student?limit=1000`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults(searchQuery);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/exam-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          marksObtained: Number(formData.marksObtained),
          totalMarks: Number(formData.totalMarks)
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ studentId: '', examName: '', subject: '', marksObtained: '', totalMarks: '', remarks: '', examDate: new Date().toISOString().split('T')[0] });
        fetchResults();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/exam-results/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchResults();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Academic Results</h1>
          <p className="text-slate-500 text-sm mt-1">Publish and manage student exam scores.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Log Exam Result
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between bg-slate-50/50">
          <form onSubmit={handleSearch} className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by student name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy"
            />
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Exam / Date</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : results.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">No results found.</td></tr>
              ) : (
                results.map((res) => {
                  const percentage = ((res.marksObtained / res.totalMarks) * 100).toFixed(1);
                  const isPass = percentage >= 40;
                  return (
                    <tr key={res.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{res.studentId?.name || 'Unknown Student'}</p>
                        <p className="text-xs text-slate-500">{res.studentId?.className || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-700">{res.examName}</p>
                        <p className="text-xs text-slate-500">{new Date(res.examDate).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{res.subject}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{res.marksObtained} / {res.totalMarks}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {percentage}% {isPass ? 'PASS' : 'FAIL'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{res.remarks || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(res.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award size={20} className="text-navy" /> Log Exam Score
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Select Student</label>
                <select name="studentId" value={formData.studentId} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option value="">-- Choose Student --</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.className || 'No Class'})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Exam Name</label>
                  <input type="text" name="examName" value={formData.examName} onChange={handleChange} required placeholder="e.g. Midterms" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option value="">-- Select Subject --</option>
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.title}>{sub.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Marks Obtained</label>
                  <input type="number" name="marksObtained" value={formData.marksObtained} onChange={handleChange} required min="0" step="0.5" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Total Marks</label>
                  <input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} required min="1" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Exam Date</label>
                  <input type="date" name="examDate" value={formData.examDate} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Remarks (Optional)</label>
                  <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="e.g. Excellent work" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg">Cancel</button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">Save Result</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
