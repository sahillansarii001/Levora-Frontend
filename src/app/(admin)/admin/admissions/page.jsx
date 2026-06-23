'use client';

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, take_admission, need_counselling, pending
  const [expandedId, setExpandedId] = useState(null);
  
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/admissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // data.data is the paginated response rows
        setAdmissions(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch admissions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/admissions/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, remarks: 'Updated by admin' })
      });
      if (res.ok) {
        setAdmissions(prev => prev.map(adm => adm.id === id ? { ...adm, status } : adm));
      } else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Failed to update status', err);
      toast.error('An error occurred while updating the status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admission?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/admissions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setAdmissions(prev => prev.filter(adm => adm.id !== id));
      } else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Failed to delete', err);
      toast.error('An error occurred while deleting.');
    }
  };

  const filteredAdmissions = admissions.filter(adm => {
    if (filter === 'take_admission') return adm.inquiryType === 'Take Admission';
    if (filter === 'need_counselling') return adm.inquiryType === 'Need Counselling';
    if (filter === 'pending') return adm.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admissions & Inquiries</h1>
          <p className="text-sm text-slate-500">Manage student admissions and website inquiries.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('take_admission')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'take_admission' ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Take Admission
          </button>
          <button 
            onClick={() => setFilter('need_counselling')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'need_counselling' ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Need Counselling
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'pending' ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="pb-6">
        <table className="w-full text-left text-sm text-slate-600 border-separate" style={{ borderSpacing: '0 12px' }}>
          <thead className="text-slate-500 font-semibold">
            <tr>
              <th className="px-6 pb-2 font-semibold">Name</th>
              <th className="px-6 pb-2 font-semibold">Type</th>
              <th className="px-6 pb-2 font-semibold">Status</th>
              <th className="px-6 pb-2 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="bg-white rounded-xl p-12 text-center text-slate-500 shadow-sm border border-slate-200">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-6 w-6 border-2 border-navy border-t-transparent rounded-full animate-spin mb-4"></div>
                    Loading admissions...
                  </div>
                </td>
              </tr>
            ) : filteredAdmissions.length === 0 ? (
              <tr>
                <td colSpan="4" className="bg-white rounded-xl p-12 text-center text-slate-500 shadow-sm border border-slate-200">
                  No admissions or inquiries found.
                </td>
              </tr>
            ) : (
              filteredAdmissions.map((adm) => (
                <React.Fragment key={adm.id}>
                <tr 
                  onClick={() => setExpandedId(expandedId === adm.id ? null : adm.id)}
                  className="bg-white shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  {/* Name */}
                  <td className={`px-6 py-4 rounded-l-xl border-l border-slate-200 group-hover:border-slate-300 ${expandedId === adm.id ? 'border-t rounded-bl-none' : 'border-y'}`}>
                    <div className="font-bold text-slate-900 text-base">
                      {adm.name || adm.studentId?.name || 'Unknown'}
                    </div>
                  </td>

                  {/* Type */}
                  <td className={`px-6 py-4 border-slate-200 group-hover:border-slate-300 ${expandedId === adm.id ? 'border-t' : 'border-y'}`}>
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${
                      adm.inquiryType === 'Take Admission' ? 'bg-purple-100 text-purple-700' :
                      adm.inquiryType === 'Need Counselling' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {adm.inquiryType || (adm.type === 'public_inquiry' ? 'Website Inquiry' : 'Internal')}
                    </span>
                  </td>

                  {/* Status */}
                  <td className={`px-6 py-4 border-slate-200 group-hover:border-slate-300 ${expandedId === adm.id ? 'border-t' : 'border-y'}`}>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold capitalize whitespace-nowrap
                      ${adm.status?.toLowerCase() === 'approved' ? 'bg-green-100 text-green-700' : 
                        adm.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}`}
                    >
                      {adm.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className={`px-6 py-4 rounded-r-xl border-r border-slate-200 group-hover:border-slate-300 ${expandedId === adm.id ? 'border-t rounded-br-none' : 'border-y'}`}>
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      {adm.status?.toLowerCase() === 'pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(adm.id, 'approved')} className="flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors p-2 rounded-lg" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusUpdate(adm.id, 'rejected')} className="flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors p-2 rounded-lg" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(adm.id)} className="flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-600 hover:text-white transition-colors p-2 rounded-lg lg:ml-2" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === adm.id && (
                  <tr>
                    <td colSpan="4" className="px-6 py-6 bg-slate-50 border-b border-x border-slate-200 rounded-b-xl shadow-inner">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                          <p className="text-sm font-medium text-slate-800">{adm.phone || adm.studentId?.phone || 'Unknown'}</p>
                          <p className="text-sm text-slate-500">{adm.email || adm.studentId?.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Program / Grade</p>
                          <p className="text-sm font-medium text-slate-800">{adm.program || adm.courseId?.title || 'Not specified'}</p>
                          <p className="text-sm text-slate-500">{adm.grade ? `Grade: ${adm.grade}` : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date Submitted</p>
                          <p className="text-sm font-medium text-slate-800">
                            {new Date(adm.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {adm.message && (
                          <div className="md:col-span-2 lg:col-span-4 mt-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Message / Notes</p>
                            <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                              {adm.message}
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
