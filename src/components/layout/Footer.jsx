'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Footer({ settings = {} }) {
  return (
    <footer className="relative bg-[var(--color-navy)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-gold)]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2">
            <Link prefetch={false} href="/" className="inline-block mb-6" aria-label="Levora Academy Home">
              <Image 
                src="/Logo.png" 
                alt="Levora Academy Logo" 
                width={270} 
                height={80} 
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
              Levora Academy is India's premium coaching destination for Class 1–12, JEE, NEET, and tech skill development. With expert faculty, proprietary study materials, and a 99% board success rate, we prepare students not just for exams — but for life.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, href: settings.facebookUrl || 'https://facebook.com/levoraacademy', label: 'Facebook' },
                { icon: <Instagram size={16} />, href: settings.instagramUrl || 'https://instagram.com/levoraacademy', label: 'Instagram' },
                { icon: <Youtube size={16} />, href: settings.youtubeUrl || 'https://youtube.com/@levoraacademy', label: 'YouTube' },
                { icon: <Linkedin size={16} />, href: settings.twitterUrl || 'https://twitter.com/levoraacademy', label: 'Twitter/X' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] hover:shadow-lg hover:shadow-amber-900/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="flex gap-4 mt-8 flex-wrap">
              {(settings.trustBadge1 || 'ISO Certified') && (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700">
                  <Sparkles size={14} className="text-[var(--color-gold)]" /> {settings.trustBadge1 || 'ISO Certified'}
                </div>
              )}
              {(settings.trustBadge2 || '15+ Years Trust') && (
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700">
                  <Sparkles size={14} className="text-[var(--color-gold)]" /> {settings.trustBadge2 || '15+ Years Trust'}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Programs</h3>
            <ul className="space-y-3.5">
              {['School Foundation', 'JEE / NEET Prep', 'Coding & Tech', 'Skill Development', 'Premium Materials'].map((item) => (
                <li key={item}>
                  <Link prefetch={false} href="/courses" className="text-sm text-slate-400 hover:text-[var(--color-gold)] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[var(--color-gold)] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Academy</h3>
            <ul className="space-y-3.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Expert Faculty', href: '/faculty' },
                { name: 'Success Stories', href: '/results' },
                { name: 'Admissions 2025–26', href: '/admissions' },
                { name: 'Contact Support', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link prefetch={false} href={item.href} className="text-sm text-slate-400 hover:text-[var(--color-gold)] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[var(--color-gold)] transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Stay Updated</h3>
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
            
            <div className="mt-8 bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Visiting Hours</h4>
              <p className="text-slate-400 text-sm whitespace-pre-line">{settings.visitingHours || 'Mon - Sun: 8:00 AM - 9:00 PM'}</p>
              <p className="text-slate-500 text-xs mt-1">Open all 7 days for admissions and inquiries.</p>
            </div>
          </div>
        </div>

        {/* Contact bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-slate-800 mb-8">
          <div className="flex items-start gap-3 text-sm text-slate-400">
            <MapPin size={18} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
            <a href="https://maps.app.goo.gl/jcSsZwDrkeG2WaJEA" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors leading-relaxed whitespace-pre-line">
              {settings.address || 'Mohite Patil Nagar, Shop no-74, Mankhurd West, Mumbai - 400043'}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 md:justify-center">
            <Phone size={18} className="text-[var(--color-gold)] flex-shrink-0" />
            <a href={`tel:${settings?.contactPhone?.replace(/\s/g, '') || '+918169976265'}`} className="hover:text-[var(--color-gold)] transition-colors font-bold text-lg text-white tracking-wide">
              {settings.contactPhone || '+91 816 997 6265'}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 md:justify-end">
            <Mail size={18} className="text-[var(--color-gold)] flex-shrink-0" />
            <a href={`mailto:${settings.contactEmail || 'hello@levoraacademy.com'}`} className="hover:text-[var(--color-gold)] transition-colors">
              {settings.contactEmail || 'hello@levoraacademy.com'}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Levora Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link prefetch={false} href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link prefetch={false} href="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
