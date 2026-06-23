'use client';
import { useState, useEffect } from 'react';
import { Percent, CalendarIcon } from 'lucide-react';

export default function AttendancePage() {
  const [student, setStudent] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setStudent(parsedUser);
      if (!parsedUser.id && !parsedUser.id) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (student) {
      if (student.id || student.id) {
        fetchAttendance();
      } else {
        setLoading(false);
      }
    }
  }, [student]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const studentId = student.id || student.id;
      // Fetch all attendance for the student to calculate overall percentage
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance?userType=student&studentId=${studentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAttendanceRecords(data.data);
      } else {
        setErrorMsg(data.message || 'Failed to fetch attendance');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  // Calculate overall percentage
  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === 'Present').length;
  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Attendance</h1>
          <p className="text-sm text-slate-500 mt-1">Track your daily class attendance and overall percentage.</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center shadow-sm">
            <div className="bg-green-50 p-3 rounded-lg mr-4">
              <Percent className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Overall Percentage</p>
              <h4 className="text-2xl font-bold text-slate-900">{loading ? '...' : `${percentage}%`}</h4>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 flex items-center"><CalendarIcon size={18} className="mr-2 text-navy" /> Detailed Attendance Log</h3>
          </div>
          <div className="p-0 overflow-y-auto max-h-96">
            {loading ? (
              <p className="p-6 text-center text-slate-500 text-sm">Loading attendance...</p>
            ) : errorMsg ? (
              <p className="p-6 text-center text-red-500 text-sm">Error: {errorMsg}</p>
            ) : attendanceRecords.length === 0 ? (
              <p className="p-6 text-center text-slate-500 text-sm">No attendance records found.</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="py-3 px-6 font-semibold">Date</th>
                    <th className="py-3 px-6 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 px-6 font-medium text-slate-700">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="py-3 px-6 text-right">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${
                          r.status === 'Present' ? 'bg-green-100 text-green-700 border-green-200' : 
                          r.status === 'Absent' ? 'bg-red-100 text-red-700 border-red-200' : 
                          'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
