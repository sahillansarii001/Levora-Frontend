'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Welcome back, {user.name}</h1>
          <p className="text-slate-500 mt-1">Here's an overview of your subscription and resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Subscription Status Card */}
        <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1a365d] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017] rounded-full filter blur-[50px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-[#D4A017]" />
            </div>
            <h2 className="text-lg font-bold">Subscription Plan</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-3xl font-extrabold capitalize mb-1">{user.subscriptionPlan || 'None'}</p>
            <p className="text-sm text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Valid until: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
            </p>
          </div>
          
          <Link href="/subscription" className="w-full inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-medium transition-colors text-sm backdrop-blur-sm">
            Manage Plan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Study Materials Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#4DA8FF]/10 text-[#4DA8FF] rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Study Materials</h2>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Access your premium chapterwise notes, PYQs, and handwritten topper insights.
          </p>
          
          <Link href="/study-materials" className="w-full inline-flex justify-center items-center gap-2 bg-[#4DA8FF]/10 hover:bg-[#4DA8FF]/20 text-[#0B1F3A] py-2.5 rounded-xl font-bold transition-colors text-sm">
            Browse Notes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
