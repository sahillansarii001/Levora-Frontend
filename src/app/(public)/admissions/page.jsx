'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdmissionsPage() {
  const [heroData, setHeroData] = useState(null);
  const [programsData, setProgramsData] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [faqsData, setFaqsData] = useState([]);
  
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  const [activeFaq, setActiveFaq] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', program: '', grade: '', inquiryType: 'Take Admission', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_BASE}/admissions/hero`);
        if (res.ok) setHeroData(await res.json());
      } catch (err) { console.error('Error fetching hero', err); }
      setLoadingHero(false);
    };

    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API_BASE}/admissions/programs`);
        if (res.ok) setProgramsData(await res.json());
      } catch (err) { console.error('Error fetching programs', err); }
      setLoadingPrograms(false);
    };

    const fetchSteps = async () => {
      try {
        const res = await fetch(`${API_BASE}/admissions/steps`);
        if (res.ok) setStepsData(await res.json());
      } catch (err) { console.error('Error fetching steps', err); }
      setLoadingSteps(false);
    };

    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API_BASE}/admissions/faqs`);
        if (res.ok) {
          const data = await res.json();
          setFaqsData(data);
          
          // Inject FAQPage JSON-LD
          if (data && data.length > 0) {
            const faqSchema = {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": data.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            };
            let script = document.getElementById('faq-schema');
            if (!script) {
              script = document.createElement('script');
              script.id = 'faq-schema';
              script.type = 'application/ld+json';
              document.head.appendChild(script);
            }
            script.innerHTML = JSON.stringify(faqSchema);
          }
        }
      } catch (err) { console.error('Error fetching faqs', err); }
      setLoadingFaqs(false);
    };

    fetchHero();
    fetchPrograms();
    fetchSteps();
    fetchFaqs();
  }, []);

  const handleFormSubmit = async () => {
    const errors = {};
    if (!formData.name) errors.name = 'Full Name is required';
    if (!formData.phone) errors.phone = 'Phone Number is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    
    try {
      setFormStatus('submitting');
      const res = await fetch(`${API_BASE}/admissions/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setFormStatus('success');
      } else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message}`);
        setFormStatus('');
      }
    } catch (err) {
      console.error('Submission error', err);
      toast.error('An error occurred. Please try again later.');
      setFormStatus('');
    }
  };

  const scrollToForm = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 font-sans">
      {/* Section 1 - Hero */}
      <section className="bg-[#0B1D3A] text-white py-20 px-4 text-center relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          {loadingHero ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-white/10 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
            </div>
          ) : heroData && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroData.headline}</h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{heroData.subheading}</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[heroData.badge1, heroData.badge2, heroData.badge3].map((badge, i) => (
                  <span key={i} className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={scrollToForm} className="bg-[#F59E0B] text-[#0B1D3A] font-bold py-3 px-8 rounded-full hover:bg-amber-400 transition-colors">
                  Apply Now
                </button>
                <a href={`tel:${heroData.ctaPhone.replace(/\s+/g, '')}`} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#0B1D3A] transition-colors">
                  Call Us: {heroData.ctaPhone}
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div>
            {/* Section 2 - Programs */}
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6">Programs Accepting Applications</h2>
            {loadingPrograms ? (
              <div className="animate-pulse space-y-3 mb-12">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-200 rounded-xl"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-12">
                {programsData.map((prog, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#0B1D3A]">{prog.name}</h3>
                      <p className="text-sm text-slate-500">Eligibility: {prog.eligibility}</p>
                    </div>
                    <span className="text-sm font-medium bg-amber-50 text-[#F59E0B] px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                      Starts: {prog.batchStarts}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Section 3 - Steps */}
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6">Admission Process</h2>
            {loadingSteps ? (
              <div className="animate-pulse space-y-4 mb-12">
                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-200 rounded-xl w-3/4"></div>)}
              </div>
            ) : (
              <div className="space-y-6 mb-12 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent hidden-before-mobile">
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative">
                  {stepsData.map((step, i) => (
                    <div key={i} className="flex md:flex-col items-start md:items-center gap-4 text-left md:text-center relative z-10 md:flex-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F59E0B] text-[#0B1D3A] flex items-center justify-center font-bold text-sm shadow-md">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0B1D3A] mb-1">{step.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5 - FAQs */}
            <h2 className="text-2xl font-bold text-[#0B1D3A] mb-6">Frequently Asked Questions</h2>
            {loadingFaqs ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-14 bg-slate-200 rounded-xl"></div>)}
              </div>
            ) : (
              <div className="space-y-3">
                {faqsData.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {activeFaq === i ? <ChevronUp size={18} className="text-slate-400 flex-shrink-0 ml-2" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0 ml-2" />}
                    </button>
                    <div className={`px-4 text-sm text-slate-600 transition-all duration-300 ease-in-out ${activeFaq === i ? 'py-4 border-t border-slate-100 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Section 4: Form */}
          <div>
            <div id="inquiry-form" className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-28">
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1D3A] mb-2">Thank you!</h3>
                  <p className="text-slate-500">We'll call you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#0B1D3A] mb-2">Inquiry Form</h2>
                  <p className="text-slate-500 mb-8 text-sm">Fill out the form below and our counseling team will get back to you shortly.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-400' : 'border-slate-200'} focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm`} 
                        placeholder="Student's Name" 
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-400' : 'border-slate-200'} focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm`} 
                        placeholder="+91 816 997 6265" 
                      />
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                        placeholder="hello@example.com" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Program Interested In</label>
                      <select 
                        value={formData.program}
                        onChange={e => setFormData({...formData, program: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm"
                      >
                        <option value="">Select Program</option>
                        {programsData.map((p, i) => (
                          <option key={i} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Class / Grade</label>
                      <input 
                        type="text" 
                        value={formData.grade}
                        onChange={e => setFormData({...formData, grade: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm" 
                        placeholder="e.g. Class 10" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">What are you looking for?</label>
                      <select 
                        value={formData.inquiryType}
                        onChange={e => setFormData({...formData, inquiryType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm"
                      >
                        <option value="Take Admission">Take Admission</option>
                        <option value="Need Counselling">Need Counselling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Message (Optional)</label>
                      <textarea 
                        rows="3" 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#F59E0B] outline-none transition-all bg-slate-50 focus:bg-white text-sm resize-none" 
                        placeholder="Any specific questions?"
                      ></textarea>
                    </div>

                    <button 
                      onClick={handleFormSubmit}
                      disabled={formStatus === 'submitting'}
                      className={`w-full font-bold py-3.5 rounded-xl transition-colors ${
                        formStatus === 'submitting' 
                          ? 'bg-slate-400 text-white cursor-not-allowed' 
                          : 'bg-[#0B1D3A] text-white hover:bg-slate-800'
                      }`}
                    >
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 - Contact Strip */}
      <section className="bg-slate-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Still have questions? We're here to help.</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-wider text-slate-500 mb-1">Call Us</p>
              <a href="tel:+918169976265" className="font-medium hover:text-white transition-colors">+91 816 997 6265</a>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-700"></div>
            <div>
              <p className="text-sm uppercase tracking-wider text-slate-500 mb-1">Email Us</p>
              <a href="mailto:hello@levoraacademy.com" className="font-medium hover:text-white transition-colors">hello@levoraacademy.com</a>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-700"></div>
            <div>
              <p className="text-sm uppercase tracking-wider text-slate-500 mb-1">Visit Us</p>
              <a href="https://maps.app.goo.gl/jcSsZwDrkeG2WaJEA" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white transition-colors block">Mohite Patil Nagar, Shop no-74, Mankhurd West, Mumbai - 400043</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
