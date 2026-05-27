'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  const [user, setUser] = useState({ role: '', email: '' });

  useEffect(() => {
    setUser({
      role: localStorage.getItem('role') || 'Admin',
      email: localStorage.getItem('email') || 'admin@levora.in',
    });
  }, []);

  // Don't show header on login page
  if (pathname === '/login') return null;

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-slate-500 hover:text-navy">
          <Menu size={24} />
        </button>
        
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students, courses..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-navy transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none capitalize">
              {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
            </p>
            <p className="text-xs text-slate-500 mt-1">{user.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-bold">
            {user.role === 'superadmin' ? 'SA' : 'AD'}
          </div>
        </div>
      </div>
      
    </header>
  );
}
