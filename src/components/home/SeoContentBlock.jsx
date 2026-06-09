'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SeoContentBlock({ content }) {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gold to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-sky to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Title Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/3 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-gold px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-wide uppercase">Our Vision</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins leading-tight">
              Shaping<br/>Bright Futures
            </h2>
            <div className="w-16 h-1 bg-gold mt-6 mx-auto md:mx-0 rounded-full"></div>
          </motion.div>

          {/* Right Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/3"
          >
            {content ? (
              <div 
                className="space-y-6 text-lg text-slate-300 leading-relaxed font-light [&>p]:mb-6 [&>p:last-child]:mb-0 seo-content-html" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
                <p>
                  Levora Academy is a great place for students to learn and grow. We help you build a bright future with our easy classes. Our teachers are very kind and care about your success. We want every student to do their very best in school.
                </p>
                <p>
                  You can study many fun subjects here. We have courses for math, science, and computer coding. We make learning easy to understand. When you join our school, you get all the help you need to get good grades. We give you great books and simple notes to study at home.
                </p>
                <p>
                  Our school has helped many students achieve their dreams. We focus on clear teaching and lots of practice. We believe that hard work pays off. We are here to guide you every step of the way. Choosing Levora Academy is a smart choice for your education and your life.
                </p>
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
