'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ParentDashboardClient() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/login');
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/parent/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (res.ok && json.success) {
          setData(json.data);
        } else {
          console.error(json.message);
          if (json.message && json.message.includes('401')) {
            router.replace('/login');
          }
        }
      } catch (err) {
        console.error("Failed to fetch parent dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500">
        <Loader2 className="animate-spin mr-2" size={24} /> Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-red-500 p-8">Failed to load dashboard data.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Parent Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Viewing progress for: <strong>{data.childName}</strong> {data.className !== 'N/A' && `(Class ${data.className})`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <TrendingUp className="text-blue-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.avgScore}</h3>
          <p className="text-sm text-slate-500 font-medium">Average Score</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <Calendar className="text-green-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.attendanceScore}</h3>
          <p className="text-sm text-slate-500 font-medium">Attendance</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <CreditCard className="text-red-500 mb-4" size={24} />
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{data.feeDue}</h3>
          <p className="text-sm text-slate-500 font-medium">Upcoming Fee Due</p>
        </div>
      </div>

      {data.alerts && data.alerts.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="text-orange-500" size={20} /> Recent Alerts & Notices
          </h3>
          {data.alerts.map((alert, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-slate-700 font-medium">{alert}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-slate-500 font-medium">No recent alerts or notices.</p>
        </div>
      )}

    </div>
  );
}
