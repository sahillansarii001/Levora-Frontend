'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, FileEdit, UserCog } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Students', href: '/admin/students', icon: <Users size={20} /> },
  { name: 'Mega CMS', href: '/admin/cms', icon: <FileEdit size={20} /> },
];

const superAdminItems = [
  { name: 'Settings', href: '#', icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-navy text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-white/10">
        <Image 
          src="/Logo.png" 
          alt="Levora Admin" 
          width={150} 
          height={40} 
          className="h-8 w-auto filter brightness-0 invert"
        />
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Menu</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
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
        
        {role === 'superadmin' && (
          <>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">Super Admin</p>
            {superAdminItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
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
          </>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
