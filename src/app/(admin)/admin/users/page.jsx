'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, UserCog, BookOpen, Plus, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', status: 'active', studyMaterialIds: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNoteBuyers();
    fetchStudyMaterials();
  }, []);

  const fetchNoteBuyers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const res = await fetch(`${baseUrl}/users`, { headers });
      const data = await res.json();
      
      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error(data.message || 'Failed to load users');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/materials`, { headers });
      const data = await res.json();
      if (data.success) {
        setStudyMaterials(data.data);
      }
    } catch (err) {
      console.error('Error fetching study materials:', err);
    }
  };

  const handleOpenModal = () => {
    setFormData({ name: '', email: '', phone: '', password: '', status: 'active', studyMaterialIds: [] });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMaterial = (id) => {
    setFormData(prev => {
      const isSelected = prev.studyMaterialIds.includes(id);
      return {
        ...prev,
        studyMaterialIds: isSelected 
          ? prev.studyMaterialIds.filter(matId => matId !== id)
          : [...prev.studyMaterialIds, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('User added successfully!');
        fetchNoteBuyers(); // Refresh list
        handleCloseModal();
      } else {
        toast.error(data.message || 'Failed to create user');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while creating the user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Note Purchasers</h1>
          <p className="text-slate-500 text-sm mt-1">View users who have registered to buy premium study materials.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 inline-flex items-center border border-slate-200 shadow-sm">
             <BookOpen size={18} className="mr-2 text-navy" /> {users.length} Total Users
          </div>
          <button onClick={handleOpenModal} className="btn-primary inline-flex items-center text-sm px-4 py-2">
            <Plus size={18} className="mr-2" /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Purchased Notes Access</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading user data...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">{(user.id || '').substring(0, 8)}...</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        {user.name}
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md inline-block ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.status || 'active'}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700">{user.phone || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 max-w-[300px]">
                      {user.purchasedNotes && user.purchasedNotes.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.purchasedNotes.map((note, idx) => (
                            <span key={idx} className="px-2 py-1 text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-md font-medium whitespace-nowrap">
                              {note}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">No notes</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button className="text-slate-400 hover:text-navy hover:bg-slate-100 p-1.5 rounded-md transition-colors" title="Manage User">
                          <UserCog size={18} />
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">Add New User & Assign Notes</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Initial Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none" />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-navy focus:border-navy outline-none">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="col-span-2 mt-2">
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Assign Notes (Grant Access)</label>
                  
                  {/* Filters for Study Materials */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <select 
                      className="px-2 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy outline-none bg-white flex-1 min-w-[100px]"
                      onChange={(e) => setFormData(prev => ({ ...prev, filterBoard: e.target.value, filterClass: '' }))}
                      value={formData.filterBoard || ''}
                    >
                      <option value="">All Boards</option>
                      {['CBSE', 'ICSE', 'SSC', 'HSC', ...new Set(studyMaterials.map(m => m.board))].filter((v, i, a) => v && v !== 'All' && v !== 'State Board' && a.indexOf(v) === i).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <select 
                      className="px-2 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy outline-none bg-white flex-1 min-w-[100px]"
                      onChange={(e) => setFormData(prev => ({ ...prev, filterClass: e.target.value }))}
                      value={formData.filterClass || ''}
                    >
                      <option value="">All Classes</option>
                      {(formData.filterBoard === 'SSC' 
                        ? ['Primary', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
                        : formData.filterBoard === 'HSC'
                          ? ['11th', '12th']
                          : [...new Set(studyMaterials.map(m => m.className))].filter(Boolean)
                      ).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <select 
                      className="px-2 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy outline-none bg-white flex-1 min-w-[100px]"
                      onChange={(e) => setFormData(prev => ({ ...prev, filterCategory: e.target.value }))}
                      value={formData.filterCategory || ''}
                    >
                      <option value="">All Categories</option>
                      {[...new Set(studyMaterials.map(m => m.category))].filter(Boolean).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto bg-slate-50 p-2 space-y-1">
                    {studyMaterials
                      .filter(m => 
                        (!formData.filterBoard || m.board === formData.filterBoard) &&
                        (!formData.filterClass || m.className === formData.filterClass) && 
                        (!formData.filterCategory || m.category === formData.filterCategory)
                      )
                      .length > 0 ? (
                      studyMaterials
                        .filter(m => 
                          (!formData.filterBoard || m.board === formData.filterBoard) &&
                          (!formData.filterClass || m.className === formData.filterClass) && 
                          (!formData.filterCategory || m.category === formData.filterCategory)
                        )
                        .map(material => (
                          <div 
                            key={material.id} 
                            onClick={() => toggleMaterial(material.id)}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors border ${formData.studyMaterialIds.includes(material.id) ? 'bg-navy text-white border-navy' : 'bg-white border-slate-200 hover:border-navy/30'}`}
                          >
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${formData.studyMaterialIds.includes(material.id) ? 'border-white bg-navy' : 'border-slate-300 bg-white'}`}>
                              {formData.studyMaterialIds.includes(material.id) && <Check size={12} className="text-white" />}
                            </div>
                            <div className="flex-1 truncate">
                              <p className={`text-sm font-medium truncate ${formData.studyMaterialIds.includes(material.id) ? 'text-white' : 'text-slate-700'}`}>{material.title}</p>
                              <p className={`text-[10px] ${formData.studyMaterialIds.includes(material.id) ? 'text-white/70' : 'text-slate-500'}`}>{material.className} • {material.category}</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-xs text-slate-500 p-2 text-center">No study materials match your filters</p>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Select the notes this user has purchased to grant them access.</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-4 shrink-0">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary text-sm px-6 py-2">
                  {isSubmitting ? 'Creating...' : 'Create & Grant Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
