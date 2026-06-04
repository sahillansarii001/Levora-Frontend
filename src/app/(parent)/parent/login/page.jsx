'use client';

import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ParentLogin() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/parent/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        
        <div className="text-center mb-10">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={240} 
            height={72} 
            className="h-14 w-auto mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold font-poppins text-slate-900 tracking-tight">Parent Portal</h2>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input type="email" required className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy outline-none" placeholder="Registered Email" />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input type="password" required className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy outline-none" placeholder="Password" />
            </div>
          </div>

          <button type="submit" className="w-full bg-gold text-navy font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
