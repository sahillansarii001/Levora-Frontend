'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, Phone, Book, School, Users, CheckCircle2, Key } from 'lucide-react';

export default function AdmissionsPage() {
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const json = await res.json();
      
      if (json.success) {
        setSuccess('Verification code sent to your email!');
        setStep(2);
      } else {
        setError(json.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, otp, ...formData }),
      });
      const json = await res.json();
      
      if (json.success) {
        setSuccess(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully! Redirecting to login...`);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(json.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 pb-12 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full z-0"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky/10 rounded-tr-full z-0"></div>
        
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl font-bold font-poppins text-navy mb-2">Apply Now / Register</h2>
          <p className="text-slate-500">Join the Levora Academy community</p>
        </div>

        {step === 1 && (
          <div className="relative z-10 flex p-1 bg-slate-100 rounded-xl mb-8">
            {['student', 'parent', 'faculty'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setFormData({}); setError(''); setSuccess(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${role === r ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {error && <div className="relative z-10 mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium">{error}</div>}
        {success && <div className="relative z-10 mb-6 p-4 bg-green-50 text-green-600 text-sm rounded-xl font-medium flex items-center"><CheckCircle2 className="mr-2 h-5 w-5"/>{success}</div>}

        {step === 1 ? (
          <form className="relative z-10 space-y-5" onSubmit={handleSendOTP}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                  <input type="text" name="name" required onChange={handleChange} value={formData.name || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Phone size={18} /></div>
                  <input type="tel" name="phone" required onChange={handleChange} value={formData.phone || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="+91 9876543210" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Mail size={18} /></div>
                <input type="email" name="email" required onChange={handleChange} value={formData.email || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Lock size={18} /></div>
                <input type="password" name="password" required onChange={handleChange} value={formData.password || ''} minLength={6} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="••••••••" />
              </div>
            </div>

            {/* Role Specific Fields */}
            {role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><School size={18} /></div>
                    <input type="text" name="schoolName" onChange={handleChange} value={formData.schoolName || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="Current School" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Class/Grade</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Users size={18} /></div>
                    <input type="text" name="className" onChange={handleChange} value={formData.className || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="e.g. 11th Science" />
                  </div>
                </div>
              </div>
            )}

            {role === 'faculty' && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Teaching Subject</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Book size={18} /></div>
                  <input type="text" name="subject" required onChange={handleChange} value={formData.subject || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="e.g. Physics, Mathematics" />
                </div>
              </div>
            )}

            {role === 'parent' && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parent Of (Student Name)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                  <input type="text" name="parentOf" required onChange={handleChange} value={formData.parentOf || ''} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all" placeholder="Enter your child's full name" />
                </div>
              </div>
            )}

            <button disabled={loading} type="submit" className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 shadow-lg hover:shadow-xl mt-6 disabled:opacity-70">
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <p className="text-slate-600">We've sent a 6-digit code to <strong>{formData.email}</strong>.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Verification Code (OTP)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Key size={18} /></div>
                <input 
                  type="text" 
                  required 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  maxLength={6} 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all text-center text-xl tracking-[0.2em] font-bold" 
                  placeholder="------" 
                />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 shadow-lg hover:shadow-xl mt-6 disabled:opacity-70">
              {loading ? 'Verifying...' : 'Verify & Submit Application'}
            </button>
            
            <button 
              type="button" 
              onClick={() => { setStep(1); setSuccess(''); setError(''); }}
              className="w-full text-sm font-medium text-slate-500 hover:text-navy mt-4"
            >
              &larr; Back to edit details
            </button>
          </form>
        )}

        <div className="relative z-10 text-center mt-8 text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-gold font-bold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}
