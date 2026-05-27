'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const hasAdminAccess = token && (role === 'admin' || role === 'superadmin');
    
    if (!hasAdminAccess && !isLoginPage) {
      // Forcibly redirect unauthenticated users (or students) to the login page
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      router.replace('/login');
    } else if (hasAdminAccess && isLoginPage) {
      // Prevent logged-in admins from seeing the login page
      router.replace('/admin/dashboard');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, isLoginPage, router]);

  // Render a loading state while checking authentication to prevent layout crash and flicker
  if (!isAuthenticated && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {!isLoginPage && <Sidebar />}
      
      <div className={`flex-1 flex flex-col ${!isLoginPage ? 'lg:ml-64' : ''}`}>
        {!isLoginPage && <AdminHeader />}
        
        <main className={`flex-1 ${!isLoginPage ? 'p-8' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
