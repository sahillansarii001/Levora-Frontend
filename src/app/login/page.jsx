'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Lock, Loader2, Sparkles, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnifiedLogin() {
  const router = useRouter();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

      const role = data.data?.role || data.role;
      const token = data.data?.token || data.token || data.data?.accessToken;
      const refreshToken = data.data?.refreshToken || data.refreshToken;
      const userObj = data.data?.student || data.data?.user || {};
      
      localStorage.setItem('token', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('role', role);
      localStorage.setItem('email', identifier);
      localStorage.setItem('user', JSON.stringify(userObj));

      if (userObj.needsPasswordReset) {
        router.push('/setup-account');
      } else if (role === 'admin' || role === 'superadmin') {
        router.push('/admin/dashboard');
      } else if (role === 'student') {
        router.push('/student/dashboard');
      } else if (role === 'faculty') {
        router.push('/faculty-portal/dashboard');
      } else if (role === 'parent') {
        router.push('/parent/dashboard');
      } else if (role === 'user') {
        router.push('/user/dashboard');
      } else {
        router.push('/dashboard');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <Link prefetch={false}href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-slate-500 hover:text-[var(--color-navy)] transition-colors font-semibold group">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden md:inline">Back to Home</span>
      </Link>

      <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent rounded-bl-[200px] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-6">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={240} 
            height={60} 
            className="h-16 w-auto mx-auto mb-4 object-contain"
          />
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-3">
            <Sparkles size={12} />
            <span>Unified Portal</span>
          </div>
          <h2 className="text-2xl font-bold font-poppins text-[var(--color-navy)] mb-1">Welcome Back</h2>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>


        <form className="relative z-10 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email / ID / Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User size={16} />
              </div>
              <input 
                type="text" 
                required 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                placeholder="Enter your Email, ID, or Phone" 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <Link prefetch={false}href="/forgot-password" className="text-xs text-[var(--color-sky)] hover:text-[var(--color-navy)] font-bold transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                placeholder="••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[var(--color-gold)] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center h-10 text-sm mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Sign In'}
          </button>
        </form>

        <div className="relative z-10 text-center mt-6 text-sm text-slate-500">
          Not registered yet?{' '}
          <Link prefetch={false}href="/signup" className="text-[var(--color-gold)] font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
