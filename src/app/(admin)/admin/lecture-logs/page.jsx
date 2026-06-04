'use client';
import { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';

export default function LectureLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [dateFilter, setDateFilter] = useState('');
  
  useEffect(() => {
    // Only superadmin can access this, handled by backend and sidebar
    fetchLogs();
  }, [dateFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/lecture-logs?limit=50${dateFilter ? `&date=${dateFilter}` : ''}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Faculty Lecture Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Review daily lecture logs submitted by faculty members.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={18} className="text-slate-400" />
          <input 
            type="date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-none outline-none text-sm font-semibold text-slate-700 bg-transparent cursor-pointer"
          />
          {dateFilter && (
            <button onClick={() => setDateFilter('')} className="text-xs text-blue-500 hover:underline ml-2">Clear</button>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Faculty</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Lesson</th>
                <th className="px-6 py-4">Topics Covered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading lecture logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">No lecture logs found.</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {new Date(log.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{log.facultyId?.name || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{log.facultyId?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-navy">
                      {log.subject}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {log.lesson}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs whitespace-pre-wrap">
                      {log.topics}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
