'use client';

import { useState, useEffect } from 'react';
import DynamicRenderer from '@/components/DynamicRenderer';
import { Lock, Sparkles, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function StudyMaterialsClient({ content }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role');
      const userStr = localStorage.getItem('user');
      let materialsAccess = false;
      try {
        if (userStr) {
          const user = JSON.parse(userStr);
          materialsAccess = user.materialsAccess === true;
        }
      } catch (e) {}

      if (role === 'superadmin' || materialsAccess) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <>
      {/* Content area */}
      <div className={!mounted || !isAuthenticated ? "blur-md select-none pointer-events-none opacity-50 h-full overflow-hidden" : "h-full overflow-y-auto pb-20"}>
        <DynamicRenderer content={content} pageName="study-materials" />
      </div>

      {/* Lock Overlay */}
      {mounted && !isAuthenticated && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="relative bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_50px_rgba(11,_31,_58,_0.1)] border border-white/50 flex flex-col items-center max-w-[360px] text-center mx-4 group overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0B1F3A] via-[#D4A017] to-[#0B1F3A]"></div>
            
            <div className="relative w-16 h-16 mb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A]/10 to-[#D4A017]/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full shadow-sm flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#0B1F3A]" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0B1F3A] to-[#1a365d] mb-3">
              Unlock Excellence
            </h2>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed font-inter">
              Get exclusive access to Levora Academy's premium chapterwise notes, handwritten topper insights, and curated PYQs.
            </p>
            
            <div className="w-full flex flex-col gap-3.5">
              <Link 
                href="/login" 
                className="relative w-full bg-[#0B1F3A] text-white py-3 rounded-xl font-medium hover:bg-[#0c264c] hover:shadow-lg hover:shadow-[#0B1F3A]/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                <LogIn className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                <span>Log In to Access</span>
              </Link>
              
              <div className="flex items-center gap-4 w-full opacity-60">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                <span className="text-[11px] text-gray-500 font-bold tracking-widest uppercase">OR</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
              </div>

              <Link 
                href="/subscription" 
                className="w-full bg-gradient-to-r from-[#D4A017]/10 to-transparent border border-[#D4A017]/30 text-[#0B1F3A] py-3 rounded-xl font-semibold hover:from-[#D4A017]/20 hover:border-[#D4A017]/50 transition-all duration-300 flex items-center justify-center gap-2 group/buy"
              >
                <Sparkles className="w-4 h-4 text-[#D4A017] transition-transform group-hover/buy:scale-110" />
                <span>Buy Complete Notes</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
