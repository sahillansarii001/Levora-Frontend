'use client';

import { useState, useEffect } from 'react';
import { Check, X, Calendar, Edit2, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [userTypeFilter, setUserTypeFilter] = useState('student');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  const [users, setUsers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [pendingChanges, setPendingChanges] = useState({});

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, [userTypeFilter, selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // 1. Fetch Users (Students or Faculties based on filter)
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/${userTypeFilter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData = await userRes.json();
      
      // 2. Fetch Attendance for the selected date
      const attRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance?userType=${userTypeFilter}&date=${selectedDate}&limit=1000`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const attData = await attRes.json();

      if (userData.success) {
        setUsers(userData.data);
      }
      
      if (attData.success) {
        // Map attendance records by userId for quick lookup
        const recordMap = {};
        attData.data.forEach(record => {
          const userId = userTypeFilter === 'student' ? record.studentId?._id : record.facultyId?._id;
          if (userId) {
            recordMap[userId] = record;
          }
        });
        setAttendanceRecords(recordMap);
        setPendingChanges({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMark = (userId, status) => {
    setPendingChanges(prev => ({
      ...prev,
      [userId]: status
    }));
  };

  const handleSubmit = async () => {
    const userIds = Object.keys(pendingChanges);
    if (userIds.length === 0) {
      showNotification('error', 'No attendance changes to submit.');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      for (const userId of userIds) {
        const status = pendingChanges[userId];
        const existingRecord = attendanceRecords[userId];
        
        let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance`;
        let method = 'POST';
        
        if (existingRecord) {
          url = `${url}/${existingRecord._id}`;
          method = 'PUT';
        }

        const payload = {
          userType: userTypeFilter,
          date: selectedDate,
          status: status,
        };
        
        if (userTypeFilter === 'student') payload.studentId = userId;
        else payload.facultyId = userId;

        await fetch(url, {
          method,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(payload)
        });
      }
      
      showNotification('success', 'Attendance successfully published!');
      setPendingChanges({});
      fetchData();
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to submit attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (userId) => {
    const existingRecord = attendanceRecords[userId];
    if (!existingRecord) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance/${existingRecord._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if ((await res.json()).success) {
        setAttendanceRecords(prev => {
          const newRecords = { ...prev };
          delete newRecords[userId];
          return newRecords;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="text-green-600" size={24} />
            ) : (
              <AlertCircle className="text-red-600" size={24} />
            )}
            <p className="font-semibold">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">Quickly mark daily attendance for your institution.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto">
            <Calendar size={18} className="text-slate-400" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none outline-none text-sm font-semibold text-slate-700 bg-transparent cursor-pointer w-full"
            />
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting || Object.keys(pendingChanges).length === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center w-full sm:w-auto ${
              Object.keys(pendingChanges).length > 0 && !submitting
                ? 'bg-navy text-white hover:bg-navy/90 hover:shadow-md'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Submitting...' : `Submit Attendance ${Object.keys(pendingChanges).length > 0 ? `(${Object.keys(pendingChanges).length})` : ''}`}
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setUserTypeFilter('student')}
          className={`pb-2 px-1 text-sm font-semibold ${userTypeFilter === 'student' ? 'border-b-2 border-navy text-navy' : 'text-slate-500'}`}
        >
          Students
        </button>
        <button 
          onClick={() => setUserTypeFilter('faculty')}
          className={`pb-2 px-1 text-sm font-semibold ${userTypeFilter === 'faculty' ? 'border-b-2 border-navy text-navy' : 'text-slate-500'}`}
        >
          Faculty
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">ID/Role</th>
                <th className="px-6 py-4 text-center">Current Status</th>
                <th className="px-6 py-4 text-right">Quick Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Loading directory...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">No {userTypeFilter}s found.</td></tr>
              ) : (
                users.map((user) => {
                  const savedRecord = attendanceRecords[user._id];
                  const pendingStatus = pendingChanges[user._id];
                  
                  const isMarked = !!savedRecord || !!pendingStatus;
                  const currentStatus = pendingStatus || (savedRecord ? savedRecord.status : null);
                  const isPending = !!pendingStatus;
                  
                  return (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {userTypeFilter === 'student' ? user.studentId : (user.subject || 'Faculty')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isMarked ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full ${
                              currentStatus === 'Present' ? 'bg-green-100 text-green-700 border border-green-200' : 
                              currentStatus === 'Absent' ? 'bg-red-100 text-red-700 border border-red-200' : 
                              'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {currentStatus}
                            </span>
                            {isPending && <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">Draft</span>}
                          </div>
                        ) : (
                          <span className="text-slate-300 italic text-xs font-medium">Pending...</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <button 
                            onClick={() => handleQuickMark(user._id, 'Present')}
                            className={`inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors border ${
                              currentStatus === 'Present' 
                                ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                                : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            }`}
                          >
                            <Check size={16} className="mr-1" /> Present
                          </button>
                          <button 
                            onClick={() => handleQuickMark(user._id, 'Absent')}
                            className={`inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors border ${
                              currentStatus === 'Absent' 
                                ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                            }`}
                          >
                            <X size={16} className="mr-1" /> Absent
                          </button>
                          
                          {!!savedRecord && !isPending && (
                            <button 
                              onClick={() => handleReset(user._id)}
                              title="Clear attendance from server"
                              className="inline-flex items-center text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors ml-2"
                            >
                              <RotateCcw size={16} />
                            </button>
                          )}
                          
                          {isPending && (
                            <button 
                              onClick={() => setPendingChanges(prev => {
                                const newChanges = {...prev};
                                delete newChanges[user._id];
                                return newChanges;
                              })}
                              title="Discard unsaved change"
                              className="inline-flex items-center text-orange-400 hover:text-orange-600 p-1.5 rounded-lg hover:bg-orange-50 transition-colors ml-2"
                            >
                              <RotateCcw size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
