'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Calendar as CalendarIcon, FileText, Send, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyDashboardClient() {
  const [faculty, setFaculty] = useState(null);
  
  // Attendance
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attLoading, setAttLoading] = useState(false);

  // Lecture Log
  const [logForm, setLogForm] = useState({ subject: '', topics: '', lesson: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    // Load faculty from local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      setFaculty(u);
      if (u.subject) {
        setLogForm(prev => ({ ...prev, subject: u.subject }));
      }
    }
  }, []);

  useEffect(() => {
    if (faculty?._id) {
      fetchAttendance();
      fetchLogs();
    }
  }, [faculty, fromDate, toDate]);

  const fetchAttendance = async () => {
    setAttLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance?userType=faculty&facultyId=${faculty._id}&fromDate=${fromDate}&toDate=${toDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAttendanceRecords(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAttLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/lecture-logs?facultyId=${faculty._id}&limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRecentLogs(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    if (!logForm.subject || !logForm.topics || !logForm.lesson) return toast.error('Please fill all fields');
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/lecture-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          facultyId: faculty._id,
          date: new Date().toISOString(),
          subject: logForm.subject,
          topics: logForm.topics,
          lesson: logForm.lesson
        })
      });
      const data = await res.json();
      if (data.success) {
        setLogForm(prev => ({ ...prev, topics: '', lesson: '' }));
        fetchLogs();
        toast.success('Daily log submitted successfully!');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!faculty) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Faculty Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, {faculty.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Widget */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center"><CalendarIcon size={18} className="mr-2 text-navy" /> My Attendance</h2>
          </div>
          <div className="p-4 bg-white border-b border-slate-100 flex gap-4 items-center">
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-semibold">From</label>
              <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} className="border border-slate-200 rounded p-1 text-sm outline-none" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-semibold">To</label>
              <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} className="border border-slate-200 rounded p-1 text-sm outline-none" />
            </div>
          </div>
          <div className="p-0 overflow-y-auto max-h-64">
            {attLoading ? (
              <p className="p-4 text-center text-slate-500 text-sm">Loading attendance...</p>
            ) : attendanceRecords.length === 0 ? (
              <p className="p-4 text-center text-slate-500 text-sm">No attendance records found for this period.</p>
            ) : (
              <table className="w-full text-sm text-left">
                <tbody>
                  {attendanceRecords.map(r => (
                    <tr key={r._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-700">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-md ${r.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Daily Lecture Log Submit Form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-800 flex items-center"><FileText size={18} className="mr-2 text-navy" /> Submit Daily Log</h2>
          </div>
          <form onSubmit={handleLogSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={logForm.subject}
                  onChange={e => setLogForm({...logForm, subject: e.target.value})}
                  disabled={!!faculty.subject} 
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 text-slate-600 disabled:opacity-70"
                />
                {faculty.subject && <Lock size={14} className="absolute right-3 top-3 text-slate-400" title="Assigned by admin" />}
              </div>
              {faculty.subject && <p className="text-xs text-slate-500 mt-1">This subject is auto-assigned to you.</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Lesson Number/Name</label>
              <input 
                type="text" 
                placeholder="e.g. Chapter 4: Calculus"
                value={logForm.lesson}
                onChange={e => setLogForm({...logForm, lesson: e.target.value})}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-navy"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Topics Covered Today</label>
              <textarea 
                rows="3"
                placeholder="List topics taught in today's lecture..."
                value={logForm.topics}
                onChange={e => setLogForm({...logForm, topics: e.target.value})}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-navy resize-y"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-2 flex justify-center items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Log</>}
            </button>
            <p className="text-xs text-center text-slate-500 italic">Note: Logs cannot be edited after submission.</p>
          </form>
        </div>
      </div>
      
      {/* Recent Logs List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800">Your Recent Logs</h2>
        </div>
        <div className="p-0 overflow-x-auto">
          {recentLogs.length === 0 ? (
            <p className="p-6 text-center text-slate-500 text-sm">No recent logs submitted.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Lesson</th>
                  <th className="px-4 py-3">Topics Covered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLogs.map(log => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-700">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{log.subject}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{log.lesson}</td>
                    <td className="px-4 py-3 text-slate-600 line-clamp-2">{log.topics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
