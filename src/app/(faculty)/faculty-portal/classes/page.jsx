'use client';
import { Users, BookOpen, Clock, MoreVertical, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MyClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        let facultyIdQuery = '';
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            const facultyId = user.id || user._id;
            if (!facultyId) {
              // If there's no faculty ID (e.g., an Admin is previewing the page), show no assigned classes.
              setClasses([]);
              setLoading(false);
              return;
            }
            facultyIdQuery = `?facultyId=${facultyId}`;
          } catch (e) {
            console.error('Error parsing user from localStorage', e);
          }
        } else {
          setClasses([]);
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/courses${facultyIdQuery}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setClasses(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch classes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Classes</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your assigned classes and student rosters.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search classes..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky/20 focus:border-sky outline-none transition-all text-sm"
              />
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        <div className={loading || classes.length === 0 ? "bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-medium">Loading classes...</div>
          ) : classes.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Users size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No Classes Assigned</h3>
              <p className="text-sm text-slate-500 max-w-sm">You have not been assigned to any classes yet. Please contact your administrator if you believe this is a mistake.</p>
            </div>
          ) : (
            classes.map((cls) => (
              <div key={cls._id || cls.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-sky/10 rounded-xl group-hover:scale-110 transition-transform">
                    <BookOpen className="text-sky" size={24} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 font-poppins mb-1">{cls.title || 'Class'}</h3>
                <p className="text-sm text-sky font-medium mb-4">{cls.batches?.length > 0 ? cls.batches.join(', ') : cls.category || 'Subject'}</p>
                
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-600 font-medium">
                    <Users size={16} className="mr-3 text-slate-400" />
                    {cls.totalStudents || 0} Students
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
