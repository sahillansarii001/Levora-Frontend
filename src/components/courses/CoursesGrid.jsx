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
    const interval = setInterval(loadCourses, 3000); // Real-time polling
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <section className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        <SectionHeading 
          title={title || "Explore Our Courses"} 
          subtitle={subtitle || "Find the perfect course to accelerate your learning journey."}
          centered={true}
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'School', 'Competitive', 'Computer', 'Skill'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-colors shadow-sm ${
                filter === cat 
                  ? 'bg-navy text-gold border-2 border-navy' 
                  : 'bg-white text-slate-600 border border-gray-200 hover:border-gold hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-20 text-xl font-bold text-navy animate-pulse">
            Loading brilliant courses...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium">
            No courses found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
}
