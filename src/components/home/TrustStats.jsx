'use client';

import { Users, BookOpen, GraduationCap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  { icon: <Users size={24} />, value: 5000, suffix: '+', label: 'Students Enrolled' },
  { icon: <BookOpen size={24} />, value: 100, suffix: '+', label: 'Courses Available' },
  { icon: <GraduationCap size={24} />, value: 50, suffix: '+', label: 'Expert Faculty' },
  { icon: <Target size={24} />, value: 100, suffix: '%', label: 'Smart Classrooms' },
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
    { icon: <Users size={22} />, value: parseNum(students) || 5000, suffix: '+', label: 'Students Enrolled' },
    { icon: <BookOpen size={22} />, value: 100, suffix: '+', label: 'Courses Available' },
    { icon: <GraduationCap size={22} />, value: parseNum(faculty) || 50, suffix: '+', label: 'Expert Faculty' },
    { icon: <Target size={22} />, value: parseNum(success) || 99, suffix: '%', label: 'Success Rate' },
  ];

  return (
    <section className="relative gradient-bg py-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {dynamicStats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[var(--color-gold)] mb-4 ring-1 ring-white/20">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-1 tracking-tight">
                <Counter from={0} to={stat.value} duration={2} />
                <span className="gradient-text ml-0.5">{stat.suffix}</span>
              </h3>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
