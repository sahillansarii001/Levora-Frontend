'use client';

import { Trophy, Users, BookOpen, Target, Star, Zap } from 'lucide-react';

export default function WhyChooseLevora({ title, featuresList }) {
  // Try to parse stringified JSON if it comes from the CMS as a string
  let parsedFeatures = [];
  try {
    parsedFeatures = typeof featuresList === 'string' ? JSON.parse(featuresList) : featuresList;
  } catch(e) {
    parsedFeatures = [];
  }

  const defaultFeatures = [
    {
      icon: <Trophy size={24} />,
      title: "Proven Track Record",
      desc: "500+ IIT/NIT selections, 1000+ doctors produced."
    },
    {
      icon: <Users size={24} />,
      title: "Expert Faculty",
      desc: "Top educators with IIT, AIIMS, and industry backgrounds."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Proprietary Study System",
      desc: "Scientifically designed notes, PYQs, and DPPs."
    },
    {
      icon: <Target size={24} />,
      title: "Personalized Mentorship",
      desc: "One-on-one career counselling for every student."
    }
  ];

  const features = (parsedFeatures && parsedFeatures.length > 0) ? parsedFeatures : defaultFeatures;

  const renderIcon = (index) => {
    // Return standard icons sequentially for dynamic features
    const icons = [<Trophy size={24} />, <Users size={24} />, <BookOpen size={24} />, <Target size={24} />, <Star size={24} />, <Zap size={24} />];
    return icons[index % icons.length];
  };

  return (
    <section className="py-20 bg-[var(--color-navy)] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-16">
          Why Students Choose Levora Academy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center mb-6">
                {feature.icon || renderIcon(idx)}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
