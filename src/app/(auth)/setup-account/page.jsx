'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function SetupAccountPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (!user.needsPasswordReset) {
        router.push('/dashboard');
        return;
      }
      setEmail(user.email || '');
      setOriginalEmail(user.email || '');
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/setup-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: originalEmail, newEmail: email, password })
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success('Account setup complete! Please log in with your new credentials.');
        localStorage.clear();
        router.push('/login');
      } else {
        toast.error(data.message || 'Failed to setup account');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden z-10">
        <div className="text-center mb-6">
          <Image 
            src="/Logo.png" 
            alt="Levora Academy Logo" 
            width={240} 
            height={60} 
            className="h-12 w-auto mx-auto mb-4 object-contain"
          />
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Set Up Your Account</h2>
          <p className="text-sm text-slate-500">Please choose a permanent password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20 outline-none text-sm" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20 outline-none text-sm" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20 outline-none text-sm" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0B1F3A] hover:bg-[#0c264c] text-white py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                Complete Setup <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
