'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowRight, CheckCircle, ShieldCheck, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';

export default function SubscriptionCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const planDetails = {
    basic: { name: 'Basic Access', price: '499', period: 'month' },
    pro: { name: 'Pro Learner', price: '1,299', period: 'quarter' },
    elite: { name: 'Elite Scholar', price: '3,999', period: 'year' }
  };

  const selectedPlan = planDetails[planId] || planDetails['pro'];

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!window.Razorpay) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    setLoading(true);
    try {
      // 1. Create order
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/subscriptions/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: selectedPlan.price.replace(/,/g, ''),
          email: email
        })
      });
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        toast.error(orderData.message || 'Failed to initiate payment');
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_StD2ExcM7XOJ5B', 
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "Levora Academy",
        description: `${selectedPlan.name} Subscription`,
        order_id: orderData.data.id,
        prefill: {
          email: email
        },
        theme: {
          color: "#0B1F3A"
        },
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/subscriptions/purchase`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
                plan: planId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setSuccess(true);
            } else {
              toast.error(verifyData.message || 'Payment verification failed');
            }
          } catch (err) {
            toast.error('Error verifying payment');
          } finally {
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response){
        toast.error(response.error.description || 'Payment Failed');
        setLoading(false);
      });
      paymentObject.open();

    } catch (err) {
      console.error(err);
      toast.error('An error occurred during checkout');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-green-400/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#0B1F3A]/10 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl border border-white text-center relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          <h1 id="checkout-success-title" className="text-3xl font-extrabold text-[#0B1F3A] mb-4 font-poppins">Purchase Successful!</h1>
          <p className="text-slate-600 mb-8 text-base leading-relaxed">
            Welcome aboard! We have sent your secure login credentials to <strong className="text-[#0B1F3A]">{email}</strong>. Please check your inbox (and spam folder) and log in to access your premium study materials.
          </p>
          <Link href="/login" className="w-full bg-gradient-to-r from-[#0B1F3A] to-[#1a365d] hover:from-[#1a365d] hover:to-[#0B1F3A] text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Go to Login Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#4DA8FF]/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#D4A017]/10 to-transparent blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-[2rem] shadow-2xl shadow-slate-200/50 max-w-5xl w-full overflow-hidden border border-white/50 flex flex-col md:flex-row relative z-10"
      >
        
        {/* Order Summary (Left side on desktop) */}
        <div className="bg-gradient-to-br from-[#0B1F3A] via-[#112a4f] to-[#1a365d] p-8 md:p-14 text-white md:w-5/12 flex flex-col justify-center relative overflow-hidden">
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#D4A017]/20 to-transparent rounded-full filter blur-[60px] transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#4DA8FF]/20 to-transparent rounded-full filter blur-[60px] transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A017] font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
              Premium Subscription
            </div>
            
            <h3 className="text-3xl md:text-4xl font-extrabold font-poppins mb-2 text-white leading-tight">
              {selectedPlan.name}
            </h3>
            <p className="text-slate-300 text-sm mb-10 opacity-90">Unlock your true potential with unlimited access to premium resources.</p>
            
            <div className="space-y-5 mb-12">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-300 font-medium">Plan Duration</span>
                <span className="font-bold capitalize bg-white/10 px-3 py-1 rounded-lg text-sm">1 {selectedPlan.period}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-300 font-medium">Premium Materials</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Included
                </span>
              </div>
            </div>
            
            <div className="mt-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-inner">
              <div className="flex justify-between items-end">
                <span className="text-lg text-slate-300 font-medium">Total Amount</span>
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                  <span className="text-2xl mr-1 text-[#D4A017]">₹</span>{selectedPlan.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form (Right side) */}
        <div className="p-8 md:p-14 md:w-7/12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h1 id="checkout-page-title" className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A] font-poppins mb-3">Complete your purchase</h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Enter your email address to receive your secure account credentials and payment receipt.
            </p>
          </div>
          
          <form onSubmit={handleCheckout} className="space-y-8">
            <div className="space-y-3 relative">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#4DA8FF] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-[#4DA8FF] focus:ring-4 focus:ring-[#4DA8FF]/10 outline-none transition-all text-base text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <p className="text-xs text-slate-500 ml-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Your information is securely encrypted.
              </p>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <button 
                id="checkout-pay-btn"
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0B1F3A] hover:bg-[#0c264c] text-white py-4 md:py-4.5 rounded-xl font-bold transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(11,31,58,0.12)] hover:shadow-[0_8px_30px_rgb(11,31,58,0.24)] hover:-translate-y-0.5 active:translate-y-0 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay Securely with Razorpay <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-xs text-slate-400">
                By completing this purchase, you agree to Levora Academy's <br className="hidden md:block" />
                <Link href="#" className="text-[#0B1F3A] hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-[#0B1F3A] hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
          </form>
        </div>
        
      </motion.div>
    </div>
  );
}
