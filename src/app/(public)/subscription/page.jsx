'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Access',
      price: '499',
      duration: 'per month',
      icon: <Star className="w-6 h-6 text-[#0B1F3A]" />,
      description: 'Perfect for students starting their exam preparation journey.',
      features: [
        'Access to Chapterwise Notes',
        'Basic Previous Year Questions (PYQs)',
        'Standard Quality PDFs',
        'Email Support'
      ],
      color: 'bg-white',
      border: 'border-slate-200',
      buttonClass: 'bg-[#0B1F3A] text-white hover:bg-[#0c264c]',
      badge: null
    },
    {
      id: 'pro',
      name: 'Pro Learner',
      price: '1,299',
      duration: 'per quarter',
      icon: <Sparkles className="w-6 h-6 text-[#D4A017]" />,
      description: 'Our most popular plan for serious students aiming for top ranks.',
      features: [
        'Everything in Basic Access',
        'Handwritten Topper Notes',
        'Detailed PYQ Solutions (Last 10 Years)',
        'High-Quality Printable PDFs',
        'Priority Support'
      ],
      color: 'bg-gradient-to-b from-[#0B1F3A] to-[#1a365d]',
      border: 'border-[#D4A017]',
      buttonClass: 'bg-gradient-to-r from-[#D4A017] to-yellow-500 text-white hover:shadow-lg hover:shadow-[#D4A017]/30',
      badge: 'Most Popular'
    },
    {
      id: 'elite',
      name: 'Elite Scholar',
      price: '3,999',
      duration: 'per year',
      icon: <Zap className="w-6 h-6 text-[#4DA8FF]" />,
      description: 'The ultimate package for comprehensive year-long preparation.',
      features: [
        'Everything in Pro Learner',
        'Exclusive Revision Modules',
        'Mock Test Papers with Solutions',
        '1-on-1 Mentorship Session (Monthly)',
        '24/7 VIP WhatsApp Support'
      ],
      color: 'bg-white',
      border: 'border-[#4DA8FF]',
      buttonClass: 'bg-[#4DA8FF] text-white hover:bg-[#3d8be6]',
      badge: 'Best Value'
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    
    // Proceed to checkout with selected plan
    router.push(`/checkout/subscription?plan=${planId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#4DA8FF]/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#D4A017]/10 to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[#D4A017] font-semibold tracking-wide uppercase text-sm mb-3">Premium Access</h2>
            <h1 id="subscription-page-title" className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] font-poppins mb-6">
              Unlock Your True Potential
            </h1>
            <p className="text-lg text-slate-600 font-inter leading-relaxed">
              Choose the perfect plan to get unlimited access to our curated study materials, handwritten notes, and comprehensive test prep resources.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 ${plan.color} ${plan.id === 'pro' ? 'shadow-2xl shadow-[#0B1F3A]/20 scale-105 z-10' : 'shadow-xl shadow-slate-200/50 hover:shadow-2xl bg-white border border-slate-200'}`}
              style={{
                borderWidth: plan.id === 'pro' ? '2px' : '1px',
                borderColor: plan.id === 'pro' ? '#D4A017' : undefined
              }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                    plan.id === 'pro' ? 'bg-gradient-to-r from-[#D4A017] to-yellow-500 text-white' : 'bg-[#4DA8FF] text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                  plan.id === 'pro' ? 'bg-white/10 backdrop-blur-sm' : 'bg-slate-50'
                }`}>
                  {plan.icon}
                </div>
                
                <h3 className={`text-2xl font-bold font-poppins mb-2 ${plan.id === 'pro' ? 'text-white' : 'text-[#0B1F3A]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.id === 'pro' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-semibold ${plan.id === 'pro' ? 'text-slate-300' : 'text-slate-500'}`}>₹</span>
                  <span className={`text-5xl font-extrabold tracking-tight ${plan.id === 'pro' ? 'text-white' : 'text-[#0B1F3A]'}`}>
                    {plan.price}
                  </span>
                </div>
                <div className={`text-sm mt-1 ${plan.id === 'pro' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.duration}
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 ${
                        plan.id === 'pro' ? 'bg-white/20' : 'bg-[#0B1F3A]/10'
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${
                          plan.id === 'pro' ? 'text-white' : 'text-[#0B1F3A]'
                        }`} />
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        plan.id === 'pro' ? 'text-slate-200' : 'text-slate-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                id={`choose-plan-btn-${plan.id}`}
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.buttonClass}`}
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-slate-500 mb-4">Secure payment processing by Razorpay. Cancel anytime.</p>
          <Link href="/contact" className="text-[#4DA8FF] font-semibold hover:underline text-sm">
            Have questions about our plans? Contact our support team.
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
