'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Calendar, CreditCard, LogOut, ClipboardList, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/parent/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Results', href: '/parent/results', icon: <TrendingUp size={20} /> },
  { name: 'Attendance', href: '/parent/attendance', icon: <Calendar size={20} /> },
  { name: 'Class Schedule', href: '/parent/schedule', icon: <Calendar size={20} /> },
  { name: 'Assignments', href: '/parent/assignments', icon: <ClipboardList size={20} /> },
  { name: 'Fee Payments', href: '/parent/fees', icon: <CreditCard size={20} /> },
];

export default function ParentSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`w-64 bg-navy text-white border-r border-white/10 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <Image 
          src="/Logo.png" 
          alt="Levora Parent" 
          width={220} 
          height={60} 
          className="h-16 w-auto filter brightness-0 invert"
        />
        <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setIsOpen && setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 shrink-0">Parent Portal</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link prefetch={false}
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-gold text-navy font-bold' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <Link prefetch={false}
          href="/login" 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('user');
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
    </>
  );
}
