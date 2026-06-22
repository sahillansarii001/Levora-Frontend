'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Upload, LogOut, Calendar, IndianRupee, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/faculty-portal/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'My Classes', href: '/faculty-portal/classes', icon: <Users size={20} /> },
  { name: 'Class Schedule', href: '/faculty-portal/schedule', icon: <Calendar size={20} /> },
  { name: 'Assignments', href: '/faculty-portal/assignments', icon: <BookOpen size={20} /> },
  { name: 'Upload Notes', href: '/faculty-portal/notes', icon: <Upload size={20} /> },
  { name: 'My Salary', href: '/faculty-portal/salary', icon: <IndianRupee size={20} /> },
];

export default function FacultySidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`w-64 bg-navy text-white border-r border-white/10 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Image 
            src="/Logo.png" 
            alt="Levora Faculty" 
            width={220} 
            height={60} 
            className="h-16 w-auto filter brightness-0 invert"
          />
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen && setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 shrink-0">Faculty Portal</p>
        
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
          onClick={() => localStorage.clear()}
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
