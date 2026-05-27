'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userTypeFilter, setUserTypeFilter] = useState('student');
  const [formData, setFormData] = useState({ userType: 'student', studentId: '', facultyId: '', date: '', status: 'Present', remarks: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Hardcoded for selection in real app, we would fetch these lists
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchRecords();
    fetchUsers();
  }, [userTypeFilter]);

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance?userType=${userTypeFilter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setRecords(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const [resStu, resFac] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/faculty`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      const dataStu = await resStu.json();
      const dataFac = await resFac.json();
      if (dataStu.success) setStudents(dataStu.data);
      if (dataFac.success) setFaculties(dataFac.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (record = null) => {
    if (record) {
      setIsEditing(true);
      setEditId(record._id);
      setFormData({
        userType: record.userType,
        studentId: record.studentId?._id || '',
        facultyId: record.facultyId?._id || '',
        date: new Date(record.date).toISOString().split('T')[0],
        status: record.status,
        remarks: record.remarks || ''
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ userType: userTypeFilter, studentId: '', facultyId: '', date: new Date().toISOString().split('T')[0], status: 'Present', remarks: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance`;
        
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        fetchRecords();
        handleCloseModal();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/attendance/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if ((await res.json()).success) fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">Track daily attendance for students and faculty.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Mark Attendance
        </button>
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
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">ID/Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No records found.</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-700">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {record.userType === 'student' ? record.studentId?.name : record.facultyId?.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {record.userType === 'student' ? record.studentId?.studentId : 'Faculty'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md ${record.status === 'Present' ? 'bg-green-100 text-green-700' : record.status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(record)} className="text-blue-500 p-1.5"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(record._id)} className="text-red-500 p-1.5"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Attendance' : 'Mark Attendance'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Type</label>
                <select name="userType" value={formData.userType} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              {formData.userType === 'student' ? (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Student</label>
                  <select name="studentId" value={formData.studentId} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option value="">Select Student...</option>
                    {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.studentId})</option>)}
                  </select>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Faculty</label>
                  <select name="facultyId" value={formData.facultyId} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option value="">Select Faculty...</option>
                    {faculties.map(f => <option key={f._id} value={f._id}>{f.name} - {f.subject}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Remarks</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg">Cancel</button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
