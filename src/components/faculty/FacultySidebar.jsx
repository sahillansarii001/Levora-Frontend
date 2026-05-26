'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Upload, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/faculty-portal/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'My Classes', href: '#', icon: <Users size={20} /> },
  { name: 'Assignments', href: '#', icon: <BookOpen size={20} /> },
  { name: 'Upload Notes', href: '#', icon: <Upload size={20} /> },
];

export default function FacultySidebar() {
  const pathname = usePathname();

  if (pathname === '/faculty-portal/login') return null;

  return (
    <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-white/10">
        <Image 
          src="/Logo.png" 
          alt="Levora Faculty" 
          width={150} 
          height={40} 
          className="h-8 w-auto filter brightness-0 invert"
        />
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">Faculty Portal</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-sky text-white font-bold' 
                  : 'text-slate-400 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <Link 
          href="/faculty-portal/login" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
