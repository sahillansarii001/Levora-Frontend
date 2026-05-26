'use client';

import { usePathname } from 'next/navigation';
import FacultySidebar from '@/components/faculty/FacultySidebar';

export default function FacultyLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/faculty-portal/login';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {!isLoginPage && <FacultySidebar />}
      
      <div className={`flex-1 flex flex-col ${!isLoginPage ? 'lg:ml-64' : ''}`}>
        <main className={`flex-1 ${!isLoginPage ? 'p-8' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
