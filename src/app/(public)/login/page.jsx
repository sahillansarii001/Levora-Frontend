'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnifiedLogin() {
  const router = useRouter();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // data.data could contain token, role, student info, etc. based on backend structure
      const role = data.data?.role || data.role;
      const token = data.data?.token || data.token || data.data?.accessToken;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('email', identifier);

      // Redirect based on role
      if (role === 'admin' || role === 'superadmin') {
        router.push('/admin/dashboard');
      } else if (role === 'student') {
        router.push('/student/dashboard');
      } else if (role === 'faculty') {
        router.push('/faculty/dashboard');
      } else if (role === 'parent') {
        router.push('/parent/dashboard');
      } else {
        router.push('/dashboard'); // fallback
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky/10 rounded-tr-full z-0"></div>
        
        <div className="relative z-10 text-center mb-10">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={160} 
            height={48} 
            className="h-10 w-auto mx-auto mb-6 object-contain"
          />
          <h2 className="text-3xl font-bold font-poppins text-navy mb-2">Welcome Back</h2>
          <p className="text-slate-500">Sign in to your account</p>
        </div>

        <form className="relative z-10 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email / Student ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors bg-slate-50 focus:bg-white" 
                placeholder="Enter your Email or ID" 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs text-sky hover:text-navy font-medium transition-colors">Forgot Password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors bg-slate-50 focus:bg-white" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-3 rounded-lg">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl mt-4 flex justify-center items-center h-12"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <div className="relative z-10 text-center mt-8 text-sm text-slate-500">
          Not registered yet? <Link href="/admissions" className="text-gold font-bold hover:underline">Apply Now</Link>
        </div>
      </div>
    </div>
  );
}
