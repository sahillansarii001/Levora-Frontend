'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Menu } from 'lucide-react';

export default function FacultyLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/faculty-portal/login';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-clip">
      {!isLoginPage && <FacultySidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      
      <div className={`flex-1 flex flex-col min-w-0 w-full ${!isLoginPage ? 'lg:pl-64' : ''}`}>
        {!isLoginPage && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden absolute top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        )}
        <main className={`flex-1 ${!isLoginPage ? 'pt-16 lg:pt-0 p-8' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
