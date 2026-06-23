'use client';
import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function StudentFeesPage() {
  const [fees, setFees] = useState([]);
  const [totalCourseFee, setTotalCourseFee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student/fees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFees(data.data.records || []);
        setTotalCourseFee(data.data.totalCourseFee || 0);
      } else {
        setErrorMsg(data.message || 'Failed to fetch fees');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error');
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = Math.max(0, totalCourseFee - totalPaid);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Fee Payments</h1>
          <p className="text-sm text-slate-500 mt-1">View your payment history and upcoming dues.</p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center">
            <div className="bg-blue-50 p-4 rounded-xl mr-4">
              <DollarSign size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Course Fee</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{totalCourseFee.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center">
            <div className="bg-green-50 p-4 rounded-xl mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Paid</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{totalPaid.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center">
            <div className="bg-orange-50 p-4 rounded-xl mr-4">
              <Clock size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Dues</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{totalPending.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Fees Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Payment History</h3>
          </div>
          <div className="p-0 overflow-y-auto">
            {loading ? (
              <p className="p-6 text-center text-slate-500 text-sm">Loading fee records...</p>
            ) : errorMsg ? (
              <p className="p-6 text-center text-red-500 text-sm">Error: {errorMsg}</p>
            ) : fees.length === 0 ? (
              <p className="p-6 text-center text-slate-500 text-sm">No fee records found.</p>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="py-3 px-6 font-semibold">Receipt / Details</th>
                    <th className="py-3 px-6 font-semibold">Payment Date</th>
                    <th className="py-3 px-6 font-semibold text-right">Amount (₹)</th>
                    <th className="py-3 px-6 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fees.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50">
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900">{f.receiptId || 'Fee Payment'}</p>
                        {f.remarks && <p className="text-xs text-slate-500 mt-0.5">{f.remarks}</p>}
                        {f.paymentMethod && <p className="text-xs text-slate-400 mt-0.5">Via {f.paymentMethod}</p>}
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {new Date(f.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-slate-900">
                        ₹{f.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                          f.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 
                          f.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {f.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {f.status}
                        </span>
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
