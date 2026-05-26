'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Assuming Next.js is proxying or CORS is allowed from port 5000
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Store token, role, and email
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('email', email);

      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        
        <div className="text-center mb-10">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={160} 
            height={48} 
            className="h-10 w-auto mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold font-poppins text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage the academy</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors bg-slate-50 focus:bg-white" 
                placeholder="admin@levora.in" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors bg-slate-50 focus:bg-white" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-slate-300 text-navy focus:ring-navy mr-2" />
              <span className="text-sm text-slate-600 font-medium">Remember me</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-navy text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg mt-2">
            Secure Sign In
          </button>
        </form>
        
      </div>
    </div>
  );
}
