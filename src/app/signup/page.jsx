'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, Phone, Book, School, Users, CheckCircle2, Key, Sparkles, Loader2, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({});
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [admissionsOpen, setAdmissionsOpen] = useState(true);
  const [fetchingSettings, setFetchingSettings] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/settings/public`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setAdmissionsOpen(json.data.admissionsOpen);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setFetchingSettings(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isSchoolClass = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].includes(formData.className);
  const isCollegeClass = ['11th', '12th'].includes(formData.className);
  const isOtherClass = formData.className === 'Other';

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

  if (fetchingSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4">
        <Loader2 className="animate-spin h-10 w-10 text-[var(--color-gold)]" />
      </div>
    );
  }

  if (!admissionsOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 px-4">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold font-poppins text-[var(--color-navy)] mb-2">Admissions Closed</h2>
          <p className="text-slate-500 mb-6">We are not accepting new applications at this time. Please check back later.</p>
          <Link href="/" className="btn-primary inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-12 pb-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-sky)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2 text-slate-500 hover:text-[var(--color-navy)] transition-colors font-semibold group">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden md:inline">Back to Home</span>
      </Link>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent rounded-bl-[200px] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-gold)]/10 to-[var(--color-gold-dark)]/10 px-4 py-1.5 rounded-full text-xs font-bold text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-4">
            <Sparkles size={12} />
            <span>Join Us</span>
          </div>
          <h2 className="text-3xl font-bold font-poppins text-[var(--color-navy)] mb-2">Apply Now</h2>
          <p className="text-slate-500">Join the Levora Academy community</p>
        </div>

        {step === 1 && (
          <div className="relative z-10 flex p-1 bg-slate-100 rounded-xl mb-8">
            {['student', 'parent', 'faculty'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setFormData({}); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all ${
                  role === r 
                    ? 'bg-white text-[var(--color-navy)] shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="relative z-10 mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="relative z-10 mb-6 p-4 bg-emerald-50 text-[var(--color-emerald)] text-sm rounded-xl border border-emerald-100 font-medium flex items-center gap-2">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {step === 1 ? (
          <form className="relative z-10 space-y-5" onSubmit={handleSendOTP}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><User size={16} /></div>
                  <input type="text" name="name" required onChange={handleChange} value={formData.name || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Phone size={16} /></div>
                  <input type="tel" name="phone" required onChange={handleChange} value={formData.phone || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="+91 816 997 6265" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Mail size={16} /></div>
                <input type="email" name="email" required onChange={handleChange} value={formData.email || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="john@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Lock size={16} /></div>
                <input type="password" name="password" required onChange={handleChange} value={formData.password || ''} minLength={6} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="••••••••" />
              </div>
            </div>

            {role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Class/Grade</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Users size={16} /></div>
                    <select name="className" onChange={handleChange} value={formData.className || ''} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm appearance-none">
                      <option value="">Select Class</option>
                      {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'Other'].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.className && !isOtherClass && (
                  <div className={isSchoolClass ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Board</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Book size={16} /></div>
                      <select name="board" onChange={handleChange} value={formData.board || ''} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm appearance-none">
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State">State</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {formData.className && !isSchoolClass && (
                  <div className={isOtherClass ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Course / Stream</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Book size={16} /></div>
                      <input type="text" name="course" onChange={handleChange} value={formData.course || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="e.g. Science, JEE" />
                    </div>
                  </div>
                )}

                {isSchoolClass && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">School Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><School size={16} /></div>
                      <input type="text" name="schoolName" onChange={handleChange} value={formData.schoolName || ''} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="Current School" />
                    </div>
                  </div>
                )}

                {isCollegeClass && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">College Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><School size={16} /></div>
                      <input type="text" name="collegeName" onChange={handleChange} value={formData.collegeName || ''} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="Current College" />
                    </div>
                  </div>
                )}

                {isOtherClass && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Batch</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Users size={16} /></div>
                      <input type="text" name="batch" onChange={handleChange} value={formData.batch || ''} required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="e.g. 2024-A" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {role === 'faculty' && (
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Teaching Subject</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Book size={16} /></div>
                  <input type="text" name="subject" required onChange={handleChange} value={formData.subject || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="e.g. Physics, Mathematics" />
                </div>
              </div>
            )}

            {role === 'parent' && (
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Parent Of (Student Name)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><User size={16} /></div>
                  <input type="text" name="parentOf" required onChange={handleChange} value={formData.parentOf || ''} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm" placeholder="Enter your child's full name" />
                </div>
              </div>
            )}

            <button disabled={loading} type="submit" className="btn-primary w-full flex justify-center items-center h-12 text-sm mt-4">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
            <div className="text-center mb-6 p-4 bg-gradient-to-r from-[var(--color-sky)]/5 to-[var(--color-emerald)]/5 rounded-xl border border-[var(--color-sky)]/10">
              <p className="text-slate-600 text-sm">We've sent a 6-digit code to <strong>{formData.email}</strong>.</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Verification Code (OTP)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Key size={16} /></div>
                <input 
                  type="text" 
                  required 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  maxLength={6} 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-slate-50 focus:bg-white text-sm text-center text-xl tracking-[0.2em] font-bold" 
                  placeholder="------" 
                />
              </div>
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full flex justify-center items-center h-12 text-sm mt-4">
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify & Submit Application'}
            </button>
            
            <button 
              type="button" 
              onClick={() => { setStep(1); setSuccess(''); setError(''); setOtp(''); }}
              className="w-full text-sm font-bold text-slate-500 hover:text-[var(--color-navy)] transition-colors mt-4"
            >
              &larr; Back to edit details
            </button>
          </form>
        )}

        <div className="relative z-10 text-center mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-gold)] font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
