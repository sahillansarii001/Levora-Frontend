'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-navy)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-gold)]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/Logo.png" 
                alt="Levora Academy Logo" 
                width={180} 
                height={54} 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
              Empowering students with world-class education, expert guidance, and state-of-the-art learning infrastructure to achieve academic and career excellence.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, href: '#' },
                { icon: <Instagram size={16} />, href: '#' },
                { icon: <Youtube size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] hover:shadow-lg hover:shadow-amber-900/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Programs</h4>
            <ul className="space-y-3.5">
              {['School Foundation', 'JEE / NEET Prep', 'Coding & Tech', 'Skill Development', 'Premium Materials'].map((item) => (
                <li key={item}>
                  <Link href="/courses" className="text-sm text-slate-400 hover:text-[var(--color-gold)] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[var(--color-gold)] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Academy</h4>
            <ul className="space-y-3.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Expert Faculty', href: '/faculty' },
                { name: 'Success Stories', href: '/results' },
                { name: 'Admissions 2024', href: '/admissions' },
                { name: 'Contact Support', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-[var(--color-gold)] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[var(--color-gold)] transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">Subscribe for the latest updates, study tips, and exclusive resources.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-all duration-300 pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 p-2 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-6 justify-center lg:justify-between items-center py-8 border-t border-slate-800 mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={14} className="text-[var(--color-gold)]" />
            <span>123 Education Hub, New Delhi, India</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Phone size={14} className="text-[var(--color-gold)]" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Mail size={14} className="text-[var(--color-gold)]" />
            <span>hello@levoraacademy.com</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Levora Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
