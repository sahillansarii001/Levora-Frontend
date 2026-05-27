'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, FileText, Calendar, LogOut } from 'lucide-react';

const navItems = [
  { name: 'My Dashboard', href: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'My Courses', href: '#', icon: <BookOpen size={20} /> },
  { name: 'Study Materials', href: '#', icon: <FileText size={20} /> },
  { name: 'Class Schedule', href: '#', icon: <Calendar size={20} /> },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  // Don't render sidebar on login page
  if (pathname === '/login') return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-slate-200">
        <Image 
          src="/Logo.png" 
          alt="Levora Student" 
          width={150} 
          height={40} 
          className="h-8 w-auto"
        />
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Student Portal</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-sky/10 text-sky font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-navy font-medium'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <Link 
          href="/login" 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
