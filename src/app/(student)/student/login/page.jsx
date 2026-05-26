'use client';

import Link from 'next/link';
import { User, Lock } from 'lucide-react';

export default function StudentLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light pt-20 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky/10 rounded-tr-full z-0"></div>
        
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-bold font-poppins text-navy mb-2">Student Portal</h2>
          <p className="text-gray-500">Login to access your dashboard</p>
        </div>

        <form className="relative z-10 space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = '/student/dashboard'; }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student ID / Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input type="text" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors" placeholder="Enter your ID" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-sky hover:text-navy font-medium">Forgot?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input type="password" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 shadow-lg hover:shadow-xl mt-4">
            Sign In
          </button>
        </form>

        <div className="relative z-10 text-center mt-8 text-sm text-gray-500">
          Not a student yet? <Link href="/admissions" className="text-gold font-bold hover:underline">Apply Now</Link>
        </div>
      </div>
    </div>
  );
}
