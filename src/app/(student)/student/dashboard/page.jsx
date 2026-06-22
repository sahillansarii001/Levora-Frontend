'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FileText, CheckCircle, BarChart3, Bell, Search, Calendar as CalendarIcon, Download } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  
  // Attendance
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attLoading, setAttLoading] = useState(false);
  const [attError, setAttError] = useState(null);

  // New Dashboard Data States
  const [notices, setNotices] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Load student from local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setStudent(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    if (student?._id || student?.id) {
      fetchAttendance();
    }
  }, [student, fromDate, toDate]);

  useEffect(() => {
    if (student?._id || student?.id) {
      fetchDashboardData();
    }
  }, [student]);

  const fetchAttendance = async () => {
    setAttLoading(true);
    try {
      const token = localStorage.getItem('token');
      const studentId = student?._id || student?.id;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance?userType=student&studentId=${studentId}&fromDate=${fromDate}&toDate=${toDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAttendanceRecords(data.data);
      } else {
        setAttError(data.message || 'Failed to fetch attendance');
      }
    } catch (err) {
      console.error(err);
      setAttError(err.message || 'Network error');
    } finally {
      setAttLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      // Fetch Notices
      const className = student.className || 'All';
      fetch(`${baseUrl}/notices?className=${className}`, { headers })
        .then(res => res.json())
        .then(data => data.success && setNotices(data.data))
        .catch(console.error);

      // Fetch Exam Results
      fetch(`${baseUrl}/exam-results/student`, { headers })
        .then(res => res.json())
        .then(data => data.success && setTestResults(data.data))
        .catch(console.error);

      // Fetch Assignments
      fetch(`${baseUrl}/assignments/student`, { headers })
        .then(res => res.json())
        .then(data => data.success && setAssignments(data.data))
        .catch(console.error);

      // Fetch Schedule
      fetch(`${baseUrl}/schedule`, { headers })
        .then(res => res.json())
        .then(data => data.success && setSchedule(data.data))
        .catch(console.error);

    } catch (err) {
      console.error(err);
    }
  };

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === 'Present').length;
  const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Calculate Avg Score
  const totalMarks = testResults.reduce((acc, test) => acc + test.totalMarks, 0);
  const obtainedMarks = testResults.reduce((acc, test) => acc + test.marksObtained, 0);
  const avgScore = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;

  // Filter today's schedule
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysClasses = schedule.filter(s => s.day === todayName);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Student Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, {student?.name || 'Student'}. Here's your overview.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-3 top-2 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy" />
            </div>
            <button className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative">
              <Bell size={18} />
              {notices.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>
            <div className="w-9 h-9 bg-navy text-white rounded-md flex items-center justify-center font-bold text-sm">
              {student?.name?.substring(0, 2).toUpperCase() || 'ST'}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Attendance (Period)', value: attLoading ? '...' : `${percentage}%`, change: 'Based on filters', icon: <CheckCircle className="text-slate-400" size={20}/> },
            { label: 'Average Score', value: `${avgScore}%`, change: 'Across recent tests', icon: <BarChart3 className="text-slate-400" size={20}/> },
            { label: 'Assignments Due', value: assignments.length, change: 'Pending submissions', icon: <FileText className="text-slate-400" size={20}/> },
            { label: 'Upcoming Classes', value: todaysClasses.length, change: `Scheduled for ${todayName}`, icon: <BookOpen className="text-slate-400" size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                {stat.icon}
              </div>
              <h4 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h4>
              <p className="text-xs font-medium text-slate-400">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Attendance Widget */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center"><CalendarIcon size={18} className="mr-2 text-navy" /> My Attendance</h3>
              </div>
              <div className="p-4 bg-white border-b border-slate-100 flex gap-4 items-center">
                <div className="flex flex-col">
                  <label className="text-xs text-slate-500 font-semibold mb-1">From Date</label>
                  <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-navy" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-slate-500 font-semibold mb-1">To Date</label>
                  <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-navy" />
                </div>
              </div>
              <div className="p-0 overflow-y-auto max-h-64">
                {attLoading ? (
                  <p className="p-6 text-center text-slate-500 text-sm">Loading attendance...</p>
                ) : attError ? (
                  <p className="p-6 text-center text-red-500 text-sm">Error: {attError}</p>
                ) : attendanceRecords.length === 0 ? (
                  <p className="p-6 text-center text-slate-500 text-sm">No attendance records found for this period.</p>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-6 font-semibold">Date</th>
                        <th className="py-3 px-6 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attendanceRecords.map(r => (
                        <tr key={r._id} className="hover:bg-slate-50">
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

            {/* Recent Test Performance */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Recent Test Performance</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {testResults.length === 0 ? (
                   <p className="p-6 text-center text-slate-500 text-sm">No recent tests found.</p>
                ) : (
                  testResults.map((test, i) => {
                    const percentage = ((test.marksObtained / test.totalMarks) * 100).toFixed(1);
                    const isPass = percentage >= 40;
                    return (
                      <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm mb-1">{test.examName}</p>
                          <p className="text-xs text-slate-500">{new Date(test.examDate).toLocaleDateString()} • {test.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{test.marksObtained} <span className="text-slate-400 text-xs font-normal">/ {test.totalMarks}</span></p>
                          <p className={`text-xs font-medium mt-1 ${isPass ? 'text-green-600' : 'text-red-600'}`}>{isPass ? 'Pass' : 'Fail'}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Today's Schedule</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {todaysClasses.length === 0 ? (
                  <p className="p-6 text-center text-slate-500 text-sm">No classes scheduled for today.</p>
                ) : (
                  todaysClasses.map((cls, i) => (
                    <div key={i} className="px-6 py-4 flex items-start hover:bg-slate-50">
                      <div className="w-24 pt-0.5">
                        <p className="text-xs font-bold text-slate-500">{cls.startTime}</p>
                        <p className="text-xs text-slate-400">{cls.endTime}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 text-sm mb-1">{cls.subject}</p>
                        <p className="text-xs text-slate-500">Room {cls.room} • {cls.faculty}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-navy hover:text-navy hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                  Download ID Card <Download size={16} className="text-slate-400" />
                </button>
                <Link prefetch={false}href="/student/materials" className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-navy hover:text-navy hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                  Premium Notes <FileText size={16} className="text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Notice Board */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Notice Board</h3>
              </div>
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {notices.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm">No new notices.</p>
                ) : (
                  notices.map((notice, i) => (
                    <div key={i}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-slate-300'}`}></span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {new Date(notice.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 mb-1">{notice.title}</p>
                      <p className="text-xs font-medium text-slate-500">{notice.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
