'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, X, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StudentsPage() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', className: '', board: '', course: '', batch: '', parentName: '', schoolName: '', collegeName: '', totalFees: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({ password: '' });
  const [passwordUserId, setPasswordUserId] = useState(null);
  
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStudentList(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (student = null) => {
    if (student) {
      setIsEditing(true);
      setEditId(student.id);
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        className: student.className || '',
        board: student.board || '',
        course: student.course || '',
        batch: student.batch || '',
        parentName: student.parentName || '',
        schoolName: student.schoolName || '',
        collegeName: student.collegeName || '',
        totalFees: student.totalFees || ''
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ name: '', email: '', phone: '', className: '', board: '', course: '', batch: '', parentName: '', schoolName: '', collegeName: '', totalFees: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', className: '', board: '', course: '', batch: '', parentName: '', schoolName: '', collegeName: '', totalFees: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student`;
        
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        fetchStudents();
        handleCloseModal();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };

  const handleOpenPasswordModal = (id) => {
    setPasswordUserId(id);
    setPasswordFormData({ password: '' });
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordUserId(null);
    setPasswordFormData({ password: '' });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordFormData.password) return toast.error('Password is required');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student/${passwordUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: passwordFormData.password })
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Password updated successfully');
        handleClosePasswordModal();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isSchoolClass = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].includes(formData.className);
  const isCollegeClass = ['11th', '12th'].includes(formData.className);
  const isOtherClass = formData.className === 'Other';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Students</h1>
          <p className="text-slate-500 text-sm mt-1">View, edit, and manage all enrolled students.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Add Student
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center">
              <Filter size={16} className="mr-2" /> Filter
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 inline-flex items-center">
              <Download size={16} className="mr-2" /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Class & Board</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : studentList.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">No students found.</td></tr>
              ) : (
                studentList.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-500">{student.studentId}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        {student.name}
                        {(!student.totalFees || student.totalFees === 0) && (
                          <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded border border-red-200 font-bold tracking-wider" title="Total Course Fee needs to be configured">
                            ⚠️ SET FEE
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{student.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700">{student.className || 'N/A'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{student.board || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      {student.schoolName && <p className="text-xs text-slate-500"><span className="font-semibold">School:</span> {student.schoolName}</p>}
                      {student.collegeName && <p className="text-xs text-slate-500"><span className="font-semibold">College:</span> {student.collegeName}</p>}
                      {student.batch && <p className="text-xs text-slate-500"><span className="font-semibold">Batch:</span> {student.batch}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md inline-block ${
                        student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenPasswordModal(student.id)} className="text-yellow-500 hover:bg-yellow-50 p-1.5 rounded-md transition-colors" title="Change Password">
                          <Key size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(student)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-md transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Class Name</label>
                  <select name="className" value={formData.className} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none">
                    <option value="">Select Class</option>
                    {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Other'].map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                {!isOtherClass && (
                  <div className={`space-y-1.5 ${isSchoolClass ? 'col-span-2' : ''}`}>
                    <label className="text-sm font-semibold text-slate-700">Board</label>
                    <select name="board" value={formData.board} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none">
                      <option value="">Select Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State">State</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
                {!isSchoolClass && (
                  <div className={`space-y-1.5 ${isOtherClass ? 'col-span-2' : ''}`}>
                    <label className="text-sm font-semibold text-slate-700">Course / Stream</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. Science, JEE" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                  </div>
                )}

                {isSchoolClass && (
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-semibold text-slate-700">School Name</label>
                    <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                  </div>
                )}
                
                {isCollegeClass && (
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-semibold text-slate-700">College Name</label>
                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                  </div>
                )}
                
                {isOtherClass && (
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Batch</label>
                    <input type="text" name="batch" value={formData.batch} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                  </div>
                )}

                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Parent Name</label>
                  <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Total Course Fee (₹) <span className="text-red-500">*</span></label>
                  <input type="number" name="totalFees" value={formData.totalFees} onChange={handleChange} required placeholder="e.g. 50000" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">
                  {isEditing ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
              <button onClick={handleClosePasswordModal} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <input 
                  type="text" 
                  value={passwordFormData.password} 
                  onChange={(e) => setPasswordFormData({ password: e.target.value })} 
                  required 
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" 
                />
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={handleClosePasswordModal} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
