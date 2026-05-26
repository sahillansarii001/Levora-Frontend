'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/Logo.png" 
                alt="Levora Academy Logo" 
                width={180} 
                height={54} 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 mb-8 max-w-sm leading-relaxed">
              Empowering students with world-class education, expert guidance, and state-of-the-art learning infrastructure to achieve academic and career excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:text-navy hover:border-slate-300 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:text-navy hover:border-slate-300 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:text-navy hover:border-slate-300 transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 hover:text-navy hover:border-slate-300 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-6">Programs</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="/courses" className="hover:text-gold transition-colors">School Foundation</Link></li>
              <li><Link href="/courses" className="hover:text-gold transition-colors">JEE / NEET Prep</Link></li>
              <li><Link href="/courses" className="hover:text-gold transition-colors">Coding & Tech</Link></li>
              <li><Link href="/courses" className="hover:text-gold transition-colors">Skill Development</Link></li>
              <li><Link href="/study-materials" className="hover:text-gold transition-colors">Premium Materials</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-6">Academy</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/faculty" className="hover:text-gold transition-colors">Expert Faculty</Link></li>
              <li><Link href="/results" className="hover:text-gold transition-colors">Success Stories</Link></li>
              <li><Link href="/admissions" className="hover:text-gold transition-colors">Admissions 2024</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact mini */}
          <div>
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-600 mb-4">Subscribe to our newsletter for the latest updates and study tips.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors pr-10" />
              <button type="submit" className="absolute right-2 top-2 text-navy hover:text-gold transition-colors">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
          
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Levora Academy. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-navy transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-navy transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
