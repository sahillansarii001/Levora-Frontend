'use client';

import { usePathname } from 'next/navigation';
import ParentSidebar from '@/components/parent/ParentSidebar';

export default function ParentLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/parent/login';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {!isLoginPage && <ParentSidebar />}
      
      <div className={`flex-1 flex flex-col ${!isLoginPage ? 'lg:ml-64' : ''}`}>
        <main className={`flex-1 ${!isLoginPage ? 'p-8' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
