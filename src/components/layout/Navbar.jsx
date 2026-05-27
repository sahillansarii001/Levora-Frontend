'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Materials', href: '/study-materials' },
  { name: 'Results', href: '/results' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-200 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-sm border-slate-200 shadow-sm py-3' : 'bg-white border-slate-100 py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={160} 
            height={48} 
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-navy">
            Login
          </Link>
          <Link href="/admissions" className="btn-primary text-sm">
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600 hover:text-navy transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg lg:hidden">
          <div className="flex flex-col py-4 px-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-navy py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <Link 
              href="/login" 
              className="text-base font-medium text-slate-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              href="/admissions" 
              className="btn-primary text-center w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
