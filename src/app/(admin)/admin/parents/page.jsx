'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ParentsPage() {
  const [parentList, setParentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', parentOf: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({ password: '' });
  const [passwordUserId, setPasswordUserId] = useState(null);
  
  const router = useRouter();

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setParentList(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (parent = null) => {
    if (parent) {
      setIsEditing(true);
      setEditId(parent.id);
      setFormData({
        name: parent.name || '',
        email: parent.email || '',
        phone: parent.phone || '',
        parentOf: parent.parentOf || '',
        password: ''
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ name: '', email: '', phone: '', parentOf: '', password: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', parentOf: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent`;
        
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
        fetchParents();
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent/${passwordUserId}`, {
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
    if (!confirm('Are you sure you want to delete this parent account?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchParents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Parents</h1>
          <p className="text-slate-500 text-sm mt-1">View, edit, and manage all parent accounts.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Add Parent
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by Name or Email..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Parent Name</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">Parent Of (Student ID)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : parentList.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No parent accounts found.</td></tr>
              ) : (
                parentList.map((parent) => (
                  <tr key={parent.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{parent.name}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700">{parent.email}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{parent.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono">
                        {parent.parentOf || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenPasswordModal(parent.id)} className="text-yellow-500 hover:bg-yellow-50 p-1.5 rounded-md transition-colors" title="Change Password">
                          <Key size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(parent)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-md transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(parent.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Delete">
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Parent' : 'Add New Parent'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Student ID (Parent Of)</label>
                  <input type="text" name="parentOf" value={formData.parentOf} onChange={handleChange} placeholder="e.g. STU-1001" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Password {isEditing && <span className="text-slate-400 font-normal">(Leave blank to keep)</span>}</label>
                  <input type="text" name="password" value={formData.password} onChange={handleChange} required={!isEditing} placeholder={isEditing ? 'Enter new password' : 'Initial Password'} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">
                  {isEditing ? 'Save Changes' : 'Create Parent'}
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
