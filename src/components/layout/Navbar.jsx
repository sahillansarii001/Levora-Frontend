'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Materials', href: '/study-materials' },
  { name: 'Results', href: '/results' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const dataStr = localStorage.getItem('user');
      const roleStr = localStorage.getItem('role');
      if (token && dataStr) {
        try {
          setAuthData(JSON.parse(dataStr));
          setUserRole(roleStr || '');
        } catch(e) {}
      } else if (token && roleStr) {
        setUserRole(roleStr);
        setAuthData({});
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardHref = () => {
    if (userRole === 'admin' || userRole === 'superadmin') return '/admin/dashboard';
    if (userRole === 'student') return '/student/dashboard';
    if (userRole === 'faculty') return '/faculty-portal/dashboard';
    if (userRole === 'parent') return '/parent/dashboard';
    return '/dashboard';
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isMobileMenuOpen 
        ? 'bg-white border-b border-slate-200/50 shadow-sm'
        : isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' 
          : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10" aria-label="Levora Academy Home">
            <Image 
              src="/Logo.png" 
              alt="Levora Academy Logo" 
              width={240} 
              height={72} 
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[var(--color-gold)] font-bold'
                    : 'text-slate-600 hover:text-[var(--color-navy)] hover:bg-slate-100/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {authData ? (
              <div className="flex items-center gap-3">
                <Link href={getDashboardHref()} className="text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors">
                  Hi, {authData.name?.split(' ')[0] || (userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Student')}
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('role');
                    localStorage.removeItem('email');
                    setAuthData(null);
                    setUserRole('');
                    window.location.reload();
                  }} 
                  className="btn-ghost text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link href="/login" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/admissions" className="btn-primary text-sm bg-slate-800 hover:bg-slate-700 text-white">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-10 p-2.5 rounded-xl text-slate-600 hover:text-[var(--color-navy)] hover:bg-slate-100 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Nav Drawer */}
      <div className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-full max-w-sm bg-white shadow-2xl lg:hidden transition-transform duration-500 ease-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col pt-4 pb-32 px-6 h-full overflow-y-auto">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[var(--color-gold)] font-bold bg-amber-50'
                    : 'text-slate-700 hover:text-[var(--color-navy)] hover:bg-slate-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8 border-t border-slate-100 space-y-3">
            {authData ? (
              <>
                <Link 
                  href={getDashboardHref()} 
                  className="block w-full text-center px-4 py-3.5 text-base font-semibold text-[var(--color-navy)] hover:bg-slate-50 rounded-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Go to Dashboard
                </Link>
                <button  
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  localStorage.removeItem('role');
                  localStorage.removeItem('email');
                  setAuthData(null);
                  setUserRole('');
                  window.location.reload();
                }}
                className="block w-full text-center px-4 py-3.5 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                Logout ({authData.name?.split(' ')[0] || (userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Student')})
              </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block w-full text-center px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/login" 
                  className="block w-full text-center btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link 
              href="/admissions" 
              className="block w-full text-center py-3.5 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
