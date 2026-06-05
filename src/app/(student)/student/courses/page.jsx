'use client';
import { BookOpen, Search, PlayCircle, Award, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          // Map DB schema to UI schema
          const formattedCourses = data.data.map((c, i) => ({
            id: c._id,
            title: c.title,
            instructor: c.facultyId?.name || 'TBA',
            progress: Math.floor(Math.random() * 100), // Placeholder for real progress
            totalLessons: Math.floor(Math.random() * 20) + 10,
            completedLessons: Math.floor(Math.random() * 10),
            thumbnail: ['bg-gradient-to-br from-blue-500 to-indigo-600', 'bg-gradient-to-br from-emerald-400 to-teal-500', 'bg-gradient-to-br from-rose-400 to-red-500'][i % 3],
            tag: c.category,
          }));
          setCourses(formattedCourses);
        }
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Courses</h1>
            <p className="text-sm text-slate-500 mt-1">Pick up where you left off and track your progress.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] shadow-sm bg-white" 
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center shadow-sm">
            <div className="bg-blue-50 p-3 rounded-lg mr-4">
              <BookOpen className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Enrolled Courses</p>
              <h4 className="text-2xl font-bold text-slate-900">{courses.length}</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center shadow-sm">
            <div className="bg-emerald-50 p-3 rounded-lg mr-4">
              <Award className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Completed Courses</p>
              <h4 className="text-2xl font-bold text-slate-900">0</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center shadow-sm">
            <div className="bg-amber-50 p-3 rounded-lg mr-4">
              <Clock className="text-amber-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Study Hours</p>
              <h4 className="text-2xl font-bold text-slate-900">42.5<span className="text-sm font-medium text-slate-400 ml-1">hrs</span></h4>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className={`h-32 ${course.thumbnail} relative p-6 flex items-end`}>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                    {course.tag}
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight font-poppins">{course.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-sm font-semibold text-slate-500 mb-6">{course.instructor}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-[var(--color-navy)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-slate-400 text-right">
                      {course.completedLessons} of {course.totalLessons} lessons
                    </p>
                  </div>
                  
                  <button className="w-full py-2.5 bg-slate-50 border border-slate-200 text-[var(--color-navy)] font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-navy)] hover:text-white hover:border-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-navy)] group-hover:text-white group-hover:border-[var(--color-navy)]">
                    <PlayCircle size={18} />
                    Continue Learning
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">
              No courses found matching "{searchQuery}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
