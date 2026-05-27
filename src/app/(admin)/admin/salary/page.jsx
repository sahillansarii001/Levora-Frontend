'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

export default function SalaryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ facultyId: '', amount: '', paymentDate: '', month: '', paymentMethod: 'Bank Transfer', status: 'Paid', remarks: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchRecords();
    fetchFaculties();
  }, []);

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/salary'}`, {
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

  const fetchFaculties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/faculty'}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setFaculties(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (record = null) => {
    if (record) {
      setIsEditing(true);
      setEditId(record._id);
      setFormData({
        facultyId: record.facultyId?._id || '',
        amount: record.amount,
        paymentDate: new Date(record.paymentDate).toISOString().split('T')[0],
        month: record.month,
        paymentMethod: record.paymentMethod,
        status: record.status,
        remarks: record.remarks || ''
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ facultyId: '', amount: '', paymentDate: new Date().toISOString().split('T')[0], month: '', paymentMethod: 'Bank Transfer', status: 'Paid', remarks: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/salary'}/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/salary'}`;
        
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      
      if ((await res.json()).success) {
        fetchRecords();
        handleCloseModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/salary'}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">Manage Faculty Salary</h1>
          <p className="text-slate-500 text-sm mt-1">Disburse payments, track salary records.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary inline-flex items-center text-sm px-4 py-2">
          <Plus size={18} className="mr-2" /> Disburse Salary
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Faculty</th>
                <th className="px-6 py-4">Salary Month</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date & Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500">No records found.</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{record.transactionId}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{record.facultyId?.name}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{record.month}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">₹{record.amount}</td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700">{new Date(record.paymentDate).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500">{record.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md ${record.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
              <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Salary Record' : 'Disburse Salary'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 p-1"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Faculty Member</label>
                <select name="facultyId" value={formData.facultyId} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option value="">Select Faculty...</option>
                  {faculties.map(f => <option key={f._id} value={f._id}>{f.name} - {f.subject}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Amount (₹)</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Salary Month</label>
                  <input type="text" name="month" value={formData.month} onChange={handleChange} placeholder="e.g. Oct 2024" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Date Paid</label>
                  <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Remarks</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg">Cancel</button>
                <button type="submit" className="btn-primary text-sm px-6 py-2">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
