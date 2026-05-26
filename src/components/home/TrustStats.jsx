'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, MonitorPlay, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  { icon: <Users size={24} />, value: 5000, suffix: '+', label: 'Students Enrolled' },
  { icon: <BookOpen size={24} />, value: 100, suffix: '+', label: 'Courses Available' },
  { icon: <GraduationCap size={24} />, value: 50, suffix: '+', label: 'Expert Faculty' },
  { icon: <MonitorPlay size={24} />, value: 100, suffix: '%', label: 'Smart Classrooms' },
];

function Counter({ from, to, duration = 2 }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / (duration * 1000)) * to), to);
      setCount(currentCount);

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}</span>;
}

export default function TrustStats({ students, success, faculty }) {
  const parseNum = (str) => {
    if (!str) return null;
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
  };

  const dynamicStats = [
    { icon: <Users size={24} />, value: parseNum(students) || 5000, suffix: '+', label: 'Students Enrolled' },
    { icon: <BookOpen size={24} />, value: 100, suffix: '+', label: 'Courses Available' },
    { icon: <GraduationCap size={24} />, value: parseNum(faculty) || 50, suffix: '+', label: 'Expert Faculty' },
    { icon: <Target size={24} />, value: parseNum(success) || 99, suffix: '%', label: 'Success Rate' },
  ];

  return (
    <section className="py-12 bg-navy border-y border-navy relative z-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {dynamicStats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-gold mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold font-poppins text-white mb-1 flex items-center tracking-tight">
                <Counter from={0} to={stat.value} duration={2} />
                <span className="text-gold ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-slate-300 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
