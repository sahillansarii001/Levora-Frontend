'use client';

import { useState, useEffect } from 'react';
import { Award, Loader2 } from 'lucide-react';

export default function StudentResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/exam-results/student`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-slate-900">My Academic Results</h1>
          <p className="text-slate-500 text-sm mt-1">View your exam scores and academic performance.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-500">
            <Loader2 className="animate-spin mr-2" size={24} /> Loading results...
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-blue-500" size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">No Results Published Yet</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Exam results and academic performance reports will appear here once they are published by the academy.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((res) => {
              const percentage = ((res.marksObtained / res.totalMarks) * 100).toFixed(1);
              const isPass = percentage >= 40;
              return (
                <div key={res._id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{res.examName}</h3>
                      <p className="text-sm font-medium text-slate-500">{res.subject}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {percentage}% {isPass ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg mb-4">
                    <div className="text-center w-full border-r border-slate-200">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Score</p>
                      <p className="text-xl font-bold text-slate-900">{res.marksObtained}</p>
                    </div>
                    <div className="text-center w-full">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total</p>
                      <p className="text-xl font-bold text-slate-500">{res.totalMarks}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <p className="text-slate-500"><span className="font-semibold text-slate-700">Remarks:</span> {res.remarks || 'None'}</p>
                    <p className="text-slate-400 font-medium">{new Date(res.examDate).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
