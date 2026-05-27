'use client';

import { useState, useEffect } from 'react';
import { Users, GraduationCap, Banknote, TrendingUp, UserPlus, MoreVertical, BookOpen, Settings, ShieldAlert, Activity, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [data, setData] = useState({
    studentCount: 0,
    courseCount: 0,
    facultyCount: 0,
    parentCount: 0,
    revenue: '₹0',
    attendance: '0%',
    recentEnrollments: []
  });
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const currentRole = localStorage.getItem('role');
        setRole(currentRole);

        if (!token) {
          router.replace('/login');
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const stats = [
    { label: 'Total Students', value: (data.studentCount || 0).toLocaleString(), change: 'Registered', icon: <Users className="text-blue-500" size={24} />, trend: 'up' },
    { label: 'Total Faculty', value: (data.facultyCount || 0).toLocaleString(), change: 'Staff members', icon: <GraduationCap className="text-orange-500" size={24} />, trend: 'up' },
    { label: 'Total Parents', value: (data.parentCount || 0).toLocaleString(), change: 'Registered', icon: <Users className="text-purple-500" size={24} />, trend: 'up' },
    { label: 'Active Courses', value: (data.courseCount || 0).toLocaleString(), change: 'Curriculums', icon: <BookOpen className="text-indigo-500" size={24} />, trend: 'up' },
    { label: 'Total Revenue', value: data.revenue, change: 'All time', icon: <Banknote className="text-green-500" size={24} />, trend: 'up' },
    { label: 'Avg. Attendance', value: data.attendance, change: 'Present Rate', icon: <TrendingUp className="text-slate-500" size={24} />, trend: 'up' }
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">
          {role === 'superadmin' ? 'Super Admin Dashboard' : 'Dashboard Overview'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">Here is what's happening in your academy today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                {stat.icon}
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <div className={`mt-4 text-xs font-bold px-2 py-1 inline-block rounded-md ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enrollments Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-slate-900">Recent Enrollments</h2>
            <button onClick={() => router.push('/admin/students')} className="text-sm font-semibold text-navy hover:text-gold transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recentEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      No recent enrollments found.
                    </td>
                  </tr>
                ) : (
                  data.recentEnrollments.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.course}</td>
                      <td className="px-6 py-4 text-slate-500">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                          row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
            <h2 className="font-bold text-slate-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4 flex-1">
            {role === 'superadmin' && (
              <button onClick={() => router.push('/admin/students')} className="w-full flex items-center p-4 border border-slate-200 rounded-lg hover:border-navy hover:shadow-sm transition-all text-left group">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Add New Student</h4>
                  <p className="text-xs text-slate-500">Manually register a user</p>
                </div>
              </button>
            )}
            <button onClick={() => router.push('/admin/cms')} className="w-full flex items-center p-4 border border-slate-200 rounded-lg hover:border-navy hover:shadow-sm transition-all text-left group">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Create Course</h4>
                <p className="text-xs text-slate-500">Draft a new curriculum</p>
              </div>
            </button>
            
            {role === 'superadmin' && (
              <button className="w-full flex items-center p-4 border border-slate-200 rounded-lg hover:border-navy hover:shadow-sm transition-all text-left group">
                <div className="bg-slate-100 text-slate-600 p-2 rounded-lg mr-4 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                  <Settings size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">System Settings</h4>
                  <p className="text-xs text-slate-500">Manage global configurations</p>
                </div>
              </button>
            )}
          </div>
        </div>

      </div>
      
      {/* Super Admin Exclusive Section */}
      {role === 'superadmin' && (
        <div className="mt-8 bg-slate-900 rounded-xl overflow-hidden shadow-md">
          <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-gold" size={24} />
              <h2 className="font-bold text-white">Super Admin Overview</h2>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-slate-400 font-medium text-sm">Database Size</h4>
                <Database className="text-slate-500" size={16} />
              </div>
              <p className="text-2xl font-bold text-white">2.4 GB</p>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-slate-400 font-medium text-sm">Admin Logs</h4>
                <Activity className="text-slate-500" size={16} />
              </div>
              <p className="text-2xl font-bold text-white">142</p>
              <p className="text-xs text-green-400 mt-1">Actions recorded today</p>
            </div>
            
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
               <div className="flex justify-between items-center mb-2">
                <h4 className="text-slate-400 font-medium text-sm">Active Admins</h4>
                <Users className="text-slate-500" size={16} />
              </div>
              <p className="text-2xl font-bold text-white">3 Online</p>
              <p className="text-xs text-slate-400 mt-1">superadmin, admin_1, admin_2</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
