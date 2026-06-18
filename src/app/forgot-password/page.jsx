'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Loader2, KeyRound, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to request OTP');
      }

      setSuccess('OTP has been sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setSuccess('OTP verified successfully. You can now reset your password.');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setSuccess('Password has been reset successfully. Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
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
      <Link href="/login" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-slate-500 hover:text-[var(--color-navy)] transition-colors font-semibold group">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden md:inline">Back to Login</span>
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
            <KeyRound size={12} />
            <span>Account Recovery</span>
          </div>
          <h2 className="text-2xl font-bold font-poppins text-[var(--color-navy)] mb-1">Forgot Password</h2>
          <p className="text-sm text-slate-500">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Enter your new password"}
          </p>
        </div>

        {step === 1 && (
          <form className="relative z-10 space-y-4" onSubmit={handleRequestOTP}>
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                  placeholder="Enter your registered email" 
                />
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
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Reset Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="relative z-10 space-y-4" onSubmit={handleVerifyOTP}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Reset Code (OTP)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={16} />
                </div>
                <input 
                  type="text" 
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm tracking-widest font-mono" 
                  placeholder="6-digit code"
                  maxLength={6}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-green-50 text-green-600 text-sm font-medium rounded-xl border border-green-100">
                {success}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center h-10 text-sm mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify Code'}
            </button>
            <div className="text-center mt-4 text-xs text-slate-500">
              Didn't receive the code?{' '}
              <button 
                type="button" 
                onClick={handleRequestOTP}
                disabled={loading}
                className="text-[var(--color-gold)] font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="relative z-10 space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                  placeholder="Enter new password" 
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-green-50 text-green-600 text-sm font-medium rounded-xl border border-green-100">
                {success}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center h-10 text-sm mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Set New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
