'use client';

import { usePathname } from 'next/navigation';
import StudentSidebar from '@/components/student/StudentSidebar';

export default function StudentLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/student/login';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {!isLoginPage && <StudentSidebar />}
      
      <div className={`flex-1 flex flex-col ${!isLoginPage ? 'lg:ml-64' : ''}`}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
