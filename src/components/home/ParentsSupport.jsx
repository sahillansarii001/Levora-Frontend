'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { ClipboardCheck, LineChart, MessageSquare, Clock } from 'lucide-react';

const defaultSupportFeatures = [
  {
    icon: <LineChart size={24} />,
    title: "Detailed Progress Reports",
    description: "Receive comprehensive monthly performance reports detailing subject-wise strengths and areas of improvement.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <ClipboardCheck size={24} />,
    title: "Weekly Assessments",
    description: "Track your child's learning trajectory through weekly tests aligned with board and competitive exam patterns.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Parent-Teacher Meetings",
    description: "Participate in regular 1-on-1 sessions with faculty to discuss academic strategy and personal development.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: <Clock size={24} />,
    title: "Real-time Attendance Tracking",
    description: "Stay informed with instant SMS and WhatsApp notifications regarding your child's daily class attendance.",
    color: "from-purple-500 to-pink-600"
  }
];

export default function ParentsSupport({ title, subtitle, features = {} }) {
  // Extract up to 4 support features from the dynamic content
  const dynamicFeatures = [];
  for (let i = 1; i <= 4; i++) {
    const supportTitle = features[`support_${i}_title`];
    const supportDesc = features[`support_${i}_desc`];
    if (supportTitle) {
      dynamicFeatures.push({ 
        title: supportTitle, 
        description: supportDesc, 
        icon: defaultSupportFeatures[(i-1) % defaultSupportFeatures.length].icon,
        color: defaultSupportFeatures[(i-1) % defaultSupportFeatures.length].color
      });
    }
  }

  const displayFeatures = dynamicFeatures.length > 0 ? dynamicFeatures : defaultSupportFeatures;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title={title || "How We Support Parents"} 
          subtitle={subtitle || "Your child's education is a partnership. We keep you informed and involved every step of the way."}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
          {displayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-navy)] mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
