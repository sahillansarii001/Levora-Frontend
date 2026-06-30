'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userStr = localStorage.getItem('user');

    if (!token || role !== 'user') {
      router.push('/login');
      return;
    }

    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Notes', href: '/study-materials', icon: <BookOpen size={20} /> },
    { name: 'Subscription Plans', href: '/subscription', icon: <Sparkles size={20} /> },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1F3A] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link href="/user/dashboard" className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg">
                <Image src="/Logo.png" alt="Logo" width={120} height={30} className="h-6 w-auto" />
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A017] to-yellow-600 flex items-center justify-center text-lg font-bold shadow-lg text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-white capitalize">{user?.name}</h3>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <div className="mt-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-[#D4A017]/20 text-[#D4A017] px-2 py-0.5 rounded-full border border-[#D4A017]/30">
                    Premium Subscriber
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#D4A017] to-yellow-600 text-white shadow-lg shadow-[#D4A017]/20' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all duration-200 text-sm font-medium group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <Image src="/Logo.png" alt="Logo" width={100} height={25} className="h-5 w-auto" />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
