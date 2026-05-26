'use client';

import { BookOpen, FileText, CheckCircle, BarChart3, Bell, LogOut, Download, Search } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Student Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, Rahul. Here's your overview.</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-3 top-2 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy" />
            </div>
            <button className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-navy text-white rounded-md flex items-center justify-center font-bold text-sm">
              RD
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Overall Attendance', value: '92%', change: '+2% this week', icon: <CheckCircle className="text-slate-400" size={20}/> },
            { label: 'Average Score', value: '78%', change: '+5% this month', icon: <BarChart3 className="text-slate-400" size={20}/> },
            { label: 'Assignments Due', value: '2', change: '3 completed', icon: <FileText className="text-slate-400" size={20}/> },
            { label: 'Upcoming Classes', value: '3', change: 'Starts in 1hr', icon: <BookOpen className="text-slate-400" size={20}/> },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
                {stat.icon}
              </div>
              <h4 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h4>
              <p className="text-xs font-medium text-slate-400">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Recent Test Performance</h3>
                <button className="text-sm font-semibold text-navy hover:text-gold transition-colors">View Report</button>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { name: 'Physics Mechanics Mock', date: '12 May, 2024', score: '85', total: '100', status: 'Excellent' },
                  { name: 'Chemistry Organic Test', date: '05 May, 2024', score: '72', total: '100', status: 'Good' },
                  { name: 'Math Full Syllabus', date: '28 Apr, 2024', score: '92', total: '100', status: 'Outstanding' },
                ].map((test, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">{test.name}</p>
                      <p className="text-xs text-slate-500">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{test.score} <span className="text-slate-400 text-xs font-normal">/ {test.total}</span></p>
                      <p className="text-xs font-medium text-green-600 mt-1">{test.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Today's Schedule</h3>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-6 py-4 flex items-start">
                  <div className="w-20 pt-0.5">
                    <p className="text-xs font-bold text-slate-500">09:00 AM</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm mb-1">Physics - Thermodynamics</p>
                    <p className="text-xs text-slate-500">Room 204 • Dr. Sharma</p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-start">
                  <div className="w-20 pt-0.5">
                    <p className="text-xs font-bold text-slate-500">11:30 AM</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm mb-1">Mathematics - Calculus</p>
                    <p className="text-xs text-slate-500">Room 102 • Prof. Verma</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-navy hover:text-navy hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                  Download ID Card <Download size={16} className="text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-navy hover:text-navy hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
                  Premium Notes <FileText size={16} className="text-slate-400" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Notice Board</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Just Now</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">Extra class for Chemistry on Sunday at 10 AM.</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">2 Days Ago</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">Admit cards for upcoming test series are available for download.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
