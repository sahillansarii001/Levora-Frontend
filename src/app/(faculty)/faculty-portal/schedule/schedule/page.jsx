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
            topic: s.topic,
            instructor: s.instructor,
            type: s.type,
            location: s.location,
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

        {/* Schedule Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Today's Classes</h3>
            <span className="bg-[var(--color-navy)] text-white text-xs font-bold px-3 py-1 rounded-full">
              {schedule.length} Classes
            </span>
          </div>
          
          <div className="p-6 relative">
            {/* Vertical Line */}
            <div className="absolute left-[88px] top-6 bottom-6 w-0.5 bg-slate-100 hidden sm:block"></div>
            
            <div className="space-y-8 relative z-10">
              {schedule.map((session, index) => (
                <div key={session.id} className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                  {/* Time Column */}
                  <div className="w-24 flex-shrink-0 sm:text-right pt-1">
                    <p className="font-bold text-slate-900">{session.time}</p>
                    <p className="text-xs font-semibold text-slate-400">{session.endTime}</p>
                  </div>
                  
                  {/* Timeline Dot (Hidden on Mobile) */}
                  <div className="hidden sm:flex flex-col items-center pt-1">
                    <div className={`w-4 h-4 rounded-full border-4 border-white bg-${session.color}-500 shadow-sm z-10 group-hover:scale-125 transition-transform`}></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-grow bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-${session.color}-500`}>
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-${session.color}-50 text-${session.color}-600 border border-${session.color}-100`}>
                          {session.subject.split(' ')[0]}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 font-poppins">{session.subject}</h3>
                        <p className="text-slate-500 text-sm mt-1">{session.topic}</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-slate-600">
                        {session.type === 'Online' ? <Video size={14} className="text-emerald-500"/> : <MapPin size={14} className="text-blue-500"/>}
                        {session.type}
                      </div>
                    </div>
                    
                    <hr className="border-slate-100 my-4" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <User size={16} className="text-slate-400" />
                          {session.instructor}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Clock size={16} className="text-slate-400" />
                          1h 30m
                        </div>
                      </div>
                      
                      <button className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                        session.type === 'Online' 
                          ? 'bg-[var(--color-navy)] text-white hover:shadow-lg hover:-translate-y-0.5' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}>
                        {session.type === 'Online' ? 'Join Class' : 'View Location'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
