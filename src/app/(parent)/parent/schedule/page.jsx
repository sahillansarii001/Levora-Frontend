'use client';
import { Calendar as CalendarIcon, Clock, MapPin, Video, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ClassSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Default to today
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schedule?date=${formattedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          // Map DB schema to UI schema
          const formattedSchedule = data.data.map(s => ({
            id: s.id,
            time: s.startTime,
            endTime: s.endTime,
            subject: s.subject,
            instructor: s.instructor,
            status: 'upcoming',
            color: s.color || 'blue'
          }));
          setSchedule(formattedSchedule);
        }
      } catch (err) {
        console.error('Failed to fetch schedule', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [currentDate]);

  return (
    <div className="pt-8 bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins tracking-tight">Class Schedule</h1>
            <p className="text-sm text-slate-500 mt-1">View your daily timetable and upcoming sessions.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
            <button className="text-slate-400 hover:text-[var(--color-navy)] transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 font-bold text-slate-700 min-w-[140px] justify-center">
              <CalendarIcon size={18} className="text-[var(--color-gold)]" />
              <span>Today, {currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            </div>
            <button className="text-slate-400 hover:text-[var(--color-navy)] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Simple Schedule List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Today's Classes</h3>
            <span className="bg-[var(--color-navy)] text-white text-xs font-bold px-3 py-1 rounded-full">
              {schedule.length} Classes
            </span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {schedule.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-medium">No classes scheduled for today.</div>
            ) : (
              schedule.map((session) => (
                <div key={session.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-slate-50 transition-colors">
                  <div className="flex-shrink-0 bg-slate-100/80 rounded-xl px-4 py-3 text-center sm:w-32 border border-slate-200/50">
                    <p className="font-bold text-slate-900 text-lg">{session.time}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1">{session.endTime}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-poppins">{session.subject}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mt-2">
                      <User size={16} className="text-slate-400" />
                      {session.instructor}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
