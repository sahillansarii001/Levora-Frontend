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
              <span className="text-sm font-semibold tracking-wide uppercase">Levora Academy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins leading-tight">
              Premium Education <br/> for JEE NEET & All Students
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
              <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed font-light">
                <p>
                  <strong>Levora Academy</strong> is the foremost destination for students seeking <strong>premium education</strong> in India. We help you build a bright future with our comprehensive classes. Our expert <strong>faculty</strong> members are highly dedicated and care deeply about the success of all <strong>students</strong>. With over 10 <strong>years exp</strong>erience in the education sector, we want every student to achieve their maximum potential.
                </p>
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Top Study Materials & Batch Empowering Learning</h3>
                <p>
                  At our academy, you can <strong>study</strong> a wide variety of subjects. We provide specialized coaching for <strong>JEE NEET</strong>, science, and coding. When you join our institute, you get access to the best <strong>study materials</strong> and premium notes to practice at home. Our <strong>batch empowering</strong> sessions ensure that every student gets personalized attention. 
                </p>
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">View All Success Stories</h3>
                <p>
                  Our holistic approach to <strong>education</strong> has helped thousands achieve their dreams. We focus on clear teaching methodologies and rigorous practice, resulting in a consistent 99% <strong>success rate</strong> in board exams. We believe that hard work paired with the right guidance pays off. We invite you to <strong>view all</strong> our courses and see how choosing Levora Academy is the smartest choice for your academic journey.
                </p>
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
