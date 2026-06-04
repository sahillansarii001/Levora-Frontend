'use client';

import { useState, useEffect } from 'react';
import SectionHeading from '../shared/SectionHeading';
import CourseCard from '../shared/CourseCard';
import { fetchCourses } from '@/lib/api';

export default function CoursesGrid({ title, subtitle }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
    const interval = setInterval(loadCourses, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(c => {
        if (filter === 'School') return c.category === 'Foundation';
        if (filter === 'Competitive') return ['JEE', 'NEET', 'Crash Course'].includes(c.category);
        if (filter === 'Computer' || filter === 'Skill') return c.category === 'Other';
        return c.category === filter;
      });

  return (
    <section className="pt-28 pb-28 bg-slate-50 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title={title || "Explore Our Courses"} 
          subtitle={subtitle || "Find the perfect course to accelerate your learning journey."}
          centered
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 mt-4">
          {['All', 'School', 'Competitive', 'Computer', 'Skill'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                filter === cat 
                  ? 'bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-[var(--color-navy)] shadow-lg shadow-amber-200/50' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[var(--color-gold)]/30 hover:text-[var(--color-navy)] hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 rounded-full border-2 border-[var(--color-gold)] border-t-transparent animate-spin mb-4" />
            <p className="text-lg font-bold text-[var(--color-navy)]">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-medium">
            No courses found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
}
