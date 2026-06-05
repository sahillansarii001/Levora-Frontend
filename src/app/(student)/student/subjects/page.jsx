'use client';
import { BookOpen, Search, PlayCircle, Award, Clock, X, Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MySubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lectureLogs, setLectureLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // 1. Fetch student profile to get their class/batch
        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/student/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profileData = await profileRes.json();
        const studentBatch = profileData.success ? profileData.data.student.className : null;

        // 2. Fetch courses assigned to that batch
        const courseUrl = studentBatch 
          ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses?batch=${encodeURIComponent(studentBatch)}`
          : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses`;
          
        const res = await fetch(courseUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const formattedCourses = data.data.map((c, i) => ({
            id: c._id,
            title: c.title,
            instructor: c.facultyId?.name || 'TBA',
            progress: c.totalLessons > 0 ? Math.round((c.completedLessons / c.totalLessons) * 100) : 0,
            totalLessons: c.totalLessons || 30,
            completedLessons: c.completedLessons || 0,
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

  const openCourseLogs = async (course) => {
    setSelectedCourse(course);
    setLogsLoading(true);
    setLectureLogs([]);
    try {
      const token = localStorage.getItem('token');
      // Fetch logs for this subject
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/lecture-logs?subject=${encodeURIComponent(course.title)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLectureLogs(data.data.results || data.data);
      }
    } catch (err) {
      console.error('Failed to fetch lecture logs', err);
    } finally {
      setLogsLoading(false);
    }
  };

  const closeLogsModal = () => {
    setSelectedCourse(null);
    setLectureLogs([]);
  };

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
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Subjects</h1>
            <p className="text-sm text-slate-500 mt-1">Pick up where you left off and track your progress.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your subjects..." 
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
              <p className="text-sm font-semibold text-slate-500">Enrolled Subjects</p>
              <h4 className="text-2xl font-bold text-slate-900">{courses.length}</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center shadow-sm">
            <div className="bg-emerald-50 p-3 rounded-lg mr-4">
              <Award className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Completed Subjects</p>
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
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500">Loading subjects...</div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
                onClick={() => openCourseLogs(course)}
              >
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
                      <span>Subject Progress</span>
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
                    View Lecture Logs
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">
              No subjects found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Lecture Logs Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className={`p-6 ${selectedCourse.thumbnail} text-white flex justify-between items-start`}>
                <div>
                  <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Lecture History</span>
                  <h2 className="text-2xl font-bold font-poppins">{selectedCourse.title}</h2>
                  <p className="text-white/80 text-sm mt-1">Instructor: {selectedCourse.instructor}</p>
                </div>
                <button 
                  onClick={closeLogsModal}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
                {logsLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-navy)] mb-4"></div>
                    <p className="text-sm font-medium">Fetching lecture logs...</p>
                  </div>
                ) : lectureLogs.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Lectures Logged Yet</h3>
                    <p className="text-sm text-slate-500">The instructor hasn't uploaded any lesson logs for this subject yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lectureLogs.map((log) => (
                      <div key={log._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">{log.lesson || 'Untitled Lesson'}</h3>
                            <div className="flex items-center text-xs font-semibold text-slate-500 mt-1 gap-4">
                              <span className="flex items-center"><CalendarIcon size={14} className="mr-1 text-slate-400" /> {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</span>
                              {log.facultyId?.name && (
                                <span className="flex items-center"><UserIcon size={14} className="mr-1 text-slate-400" /> {log.facultyId.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topics Covered</p>
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">{log.topics}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
                <button 
                  onClick={closeLogsModal}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
