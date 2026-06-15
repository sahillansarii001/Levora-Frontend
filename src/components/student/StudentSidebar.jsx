'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, FileText, Calendar, LogOut, ClipboardList, CheckSquare, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StudentSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [studentClass, setStudentClass] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setStudentClass(user.className || '');
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  // Determine if the student is in 1st to 12th grade
  const isSchoolStudent = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].includes(studentClass);

  const navItems = [
    { name: 'My Dashboard', href: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      name: isSchoolStudent ? 'My Subjects' : 'My Courses', 
      href: isSchoolStudent ? '/student/subjects' : '/student/courses', 
      icon: <BookOpen size={20} /> 
    },
    { name: 'Assignments', href: '/student/assignments', icon: <ClipboardList size={20} /> },
    { name: 'Study Materials', href: '/student/materials', icon: <FileText size={20} /> },
    { name: 'Results', href: '/student/results', icon: <FileText size={20} /> },
    { name: 'Class Schedule', href: '/student/schedule', icon: <Calendar size={20} /> },
    { name: 'My Attendance', href: '/student/attendance', icon: <CheckSquare size={20} /> },
    { name: 'My Profile', href: '/student/profile', icon: <User size={20} /> },
  ];

  // Don't render sidebar on login page
  if (pathname === '/login') return null;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <aside className={`w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <Image 
          src="/Logo.png" 
          alt="Levora Student" 
          width={220} 
          height={60} 
          className="h-16 w-auto"
        />
        <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsOpen && setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 py-4 px-4 flex flex-col gap-2 overflow-y-auto">
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
            localStorage.removeItem('user');
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
    </>
  );
}
